#!/usr/bin/env Rscript
#
# Refresh docs/publications.csv, the publication list shown on analysis.html.
#
# Google Scholar has no API and blocks datacenter IPs, so the GitHub Actions
# runner cannot fetch it - analysis.Rmd falls back to the committed CSV. Run
# this from a normal network connection (a laptop on campus or at home) when
# the list needs updating, then commit the result:
#
#   Rscript docs/refresh_publications.R
#   git add docs/publications.csv && git commit -m 'Refresh publications'
#
# The CSV is only rewritten when every profile responds, so a partial fetch
# cannot silently drop an author from the list.

suppressMessages({
  library(scholar)
  library(magrittr)
  library(dplyr)
})

scholarIDs <- c("W_54zuEAAAAJ&hl","M4z_6poAAAAJ","H5XCHi0AAAAJ",
                "4wmnEI4AAAAJ","nnaXNlgAAAAJ")
outFile <- file.path(dirname(sub("^--file=", "", grep("^--file=", commandArgs(), value = TRUE)[1])),
                     "publications.csv")
if (is.na(outFile) || !nzchar(outFile)) outFile <- "docs/publications.csv"

fetched <- lapply(scholarIDs, function(id){
  res <- suppressWarnings(tryCatch(get_publications(id), error = function(e) NULL))
  ok <- is.data.frame(res) && nrow(res) > 0
  message(sprintf("  %-18s %s", id, if (ok) paste(nrow(res), "publications") else "NO RESPONSE"))
  if (ok) res else NULL
})
names(fetched) <- scholarIDs
missing <- scholarIDs[vapply(fetched, is.null, logical(1))]

if (length(missing) > 0) {
  stop("No response for: ", paste(missing, collapse = ", "),
       "\n  Google is most likely rate limiting this network. Wait and retry;",
       "\n  ", basename(outFile), " has been left unchanged.", call. = FALSE)
}

allPubs <- do.call(rbind, fetched) %>%
  distinct %>%
  select(title, author, journal, year) %>%
  distinct %>%
  arrange(desc(year))

# fileEncoding is explicit: R mangles non-ASCII to "<U+XXXX>" literals when
# the session locale is C rather than UTF-8.
write.csv(allPubs, outFile, row.names = FALSE, fileEncoding = "UTF-8")
message(sprintf("\nWrote %s: %d publications, %s-%s",
                outFile, nrow(allPubs), min(allPubs$year, na.rm = TRUE),
                max(allPubs$year, na.rm = TRUE)))
