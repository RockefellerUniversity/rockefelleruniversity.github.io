require(magrittr)
require(ymlthis)
require(yaml)
library("redmineR")

toDownload <- redmine_list_issues(issue_id = 2855,include="attachments")
trainingsheet <- toDownload$content$issues[[1]]$attachments[[1]]$content_url
httr::GET(url = trainingsheet, httr::add_headers(`X-Redmine-API-Key` = redmineR:::redmine_token()), 
          httr::write_disk(file.path("docs",basename(trainingsheet)),overwrite = TRUE))


yml_empty() %>%
  yml_site_opts(
    name = ,
    output_dir =  ".",
  ) %>%
  yml_navbar(
    title = "Bioinformatics Resource Center",
    left = list(
      navbar_page("Home", href = "index.html"),
      navbar_page("Software", href = "software.html"),
      navbar_page("Training", href = "training.html"),
      navbar_page("Analysis", href = "analysis.html")
    ),
    right = list(
                 navbar_page(icon="ion-social-github",href="https://github.com/RockefellerUniversity"),
                 navbar_page(icon="ion-social-youtube",href="https://www.youtube.com/@brcru"),
                 navbar_page(icon="ion-social-twitter",href="https://twitter.com/Rockefeller_BRC"))
  ) %>%
  yml_output(html_document(toc = TRUE,theme="cosmo", toc_float=TRUE,highlight = "textmate")) %>% 
  as.yaml %>% 
  writeLines(con = file.path("docs","_site.yml"))


rmarkdown::render_site(input = file.path("docs"))
