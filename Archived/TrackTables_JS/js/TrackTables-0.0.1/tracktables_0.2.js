/*
 tracktables JS v0.0.1 (2013-07-01)

 (c) 2013 Carroll TS, CRUK Cambridge Institute

 License: 
*/


		jQuery.fn.dataTableExt.oApi.fnGetColumnData = function ( oSettings, iColumn, bUnique, bFiltered, bIgnoreEmpty ) {
						    // check that we have a column id
						    if ( typeof iColumn == "undefined" ) return [];

						    // by default we only wany unique data
						    if ( typeof bUnique == "undefined" ) bUnique = true;

						    // by default we do want to only look at filtered data
						    if ( typeof bFiltered == "undefined" ) bFiltered = true;

						    // by default we do not wany to include empty values
						    if ( typeof bIgnoreEmpty == "undefined" ) bIgnoreEmpty = true;

						    // list of rows which we're going to loop through
						    var aiRows;

						    // use only filtered rows
						    if (bFiltered == true) aiRows = oSettings.aiDisplay;
						    // use all rows
						    else aiRows = oSettings.aiDisplayMaster; // all row numbers

						    // set up data array
						    var asResultData = new Array();

						    for (var i=0,c=aiRows.length; i<c; i++) {
						        iRow = aiRows[i];
						        var sValue = this.fnGetData(iRow, iColumn);

						        // ignore empty values?
						        if (bIgnoreEmpty == true && sValue.length == 0) continue;

						        // ignore unique values?
						        else if (bUnique == true && jQuery.inArray(sValue, asResultData) > -1) continue;

						        // else push the value onto the result data array
						        else asResultData.push(sValue);
						    }

						    return asResultData;
		};



		filterMainTable = function (Data2,filtIndex2) {
			var DataTemp =new Array(filtIndex2.length);

			//console.log(filtIndex2.length)

			for(k=0;k<filtIndex2.length;k++)
			{
				for (i=0;i<Data2.length;i++)
				  {
					if(Data[i][0] == filtIndex2[k])
					DataTemp[k] = Data2[i]
				  }

			}
			return DataTemp
		}


function HighTables(data,nameIndex,chartColnames,allChartNames,allChartIndicies,allTableNames,allTableIndicies,allChartTypes)
{


this.data=data
this.chartIndicies=allChartIndicies
this.chartNames=allChartNames
this.tableNames=allTableNames
this.tableIndicies=allTableIndicies
this.nameIndex=nameIndex
this.chartColnames = chartColnames
this.chartTypes= allChartTypes


}


$.fn.dataTableExt.oApi.fnFilterAll = function(oSettings, sInput, iColumn, bRegex, bSmart) {
    var settings = $.fn.dataTableSettings;

    for ( var i=0 ; i<settings.length ; i++ ) {
      settings[i].oInstance.fnFilter( sInput, iColumn, bRegex, bSmart);
    }
};


/* API method to get paging information */
$.fn.dataTableExt.oApi.fnPagingInfo = function ( oSettings )
{
    return {
        "iStart":         oSettings._iDisplayStart,
        "iEnd":           oSettings.fnDisplayEnd(),
        "iLength":        oSettings._iDisplayLength,
        "iTotal":         oSettings.fnRecordsTotal(),
        "iFilteredTotal": oSettings.fnRecordsDisplay(),
        "iPage":          oSettings._iDisplayLength === -1 ?
            0 : Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ),
        "iTotalPages":    oSettings._iDisplayLength === -1 ?
            0 : Math.ceil( oSettings.fnRecordsDisplay() / oSettings._iDisplayLength )
    };
}

/* Bootstrap style pagination control */
$.extend( $.fn.dataTableExt.oPagination, {
    "bootstrap": {
        "fnInit": function( oSettings, nPaging, fnDraw ) {
            var oLang = oSettings.oLanguage.oPaginate;
            var fnClickHandler = function ( e ) {
                e.preventDefault();
                if ( oSettings.oApi._fnPageChange(oSettings, e.data.action) ) {
                    fnDraw( oSettings );
                }
            };

            $(nPaging).addClass('pagination').append(
                '<ul>'+
                    '<li class="prev disabled"><a href="#">&larr; '+oLang.sPrevious+'</a></li>'+
                    '<li class="next disabled"><a href="#">'+oLang.sNext+' &rarr; </a></li>'+
                '</ul>'
            );
            var els = $('a', nPaging);
            $(els[0]).bind( 'click.DT', { action: "previous" }, fnClickHandler );
            $(els[1]).bind( 'click.DT', { action: "next" }, fnClickHandler );
        },

        "fnUpdate": function ( oSettings, fnDraw ) {
            var iListLength = 5;
            var oPaging = oSettings.oInstance.fnPagingInfo();
            var an = oSettings.aanFeatures.p;
            var i, j, sClass, iStart, iEnd, iHalf=Math.floor(iListLength/2);

            if ( oPaging.iTotalPages < iListLength) {
                iStart = 1;
                iEnd = oPaging.iTotalPages;
            }
            else if ( oPaging.iPage <= iHalf ) {
                iStart = 1;
                iEnd = iListLength;
            } else if ( oPaging.iPage >= (oPaging.iTotalPages-iHalf) ) {
                iStart = oPaging.iTotalPages - iListLength + 1;
                iEnd = oPaging.iTotalPages;
            } else {
                iStart = oPaging.iPage - iHalf + 1;
                iEnd = iStart + iListLength - 1;
            }

            for ( i=0, iLen=an.length ; i<iLen ; i++ ) {
                // Remove the middle elements
                $('li:gt(0)', an[i]).filter(':not(:last)').remove();

                // Add the new list items and their event handlers
                for ( j=iStart ; j<=iEnd ; j++ ) {
                    sClass = (j==oPaging.iPage+1) ? 'class="active"' : '';
                    $('<li '+sClass+'><a href="#">'+j+'</a></li>')
                        .insertBefore( $('li:last', an[i])[0] )
                        .bind('click', function (e) {
                            e.preventDefault();
                            oSettings._iDisplayStart = (parseInt($('a', this).text(),10)-1) * oPaging.iLength;
                            fnDraw( oSettings );
                        } );
                }

                // Add / remove disabled classes from the static elements
                if ( oPaging.iPage === 0 ) {
                    $('li:first', an[i]).addClass('disabled');
                } else {
                    $('li:first', an[i]).removeClass('disabled');
                }

                if ( oPaging.iPage === oPaging.iTotalPages-1 || oPaging.iTotalPages === 0 ) {
                    $('li:last', an[i]).addClass('disabled');
                } else {
                    $('li:last', an[i]).removeClass('disabled');
                }
            }
        }
    }
} );

functionAtRedraw = function () {

			if ( typeof this != 'undefined' ) {
				//var divsObject = document.getElementsByTagName("div");
				//console.log(divsObject[0])
				//console.log(divsObject)
									//for(var i = 0; i < divsObject.length; i++){
									   //do something to each div like
									   //console.log(divsObject[i].id);
									//}
			var filtIndex = this.fnGetColumnData(0)
			DataTemp2 = filterMainTable(Data,filtIndex)
			//var oSettings = this.fnSettings();
			//console.log(oSettings.oPreviousSearch.sSearch)
			var hightablesObjTemp = new HighTables(DataTemp2,NameIndex,ChartColnames,allChartNames,allChartIndicies,allTableNames,allTableIndicies,allChartTypes)
			var ChartIndiciesBar = find("barchart",hightablesObjTemp.chartTypes)
			var ChartIndiciesBubble = find("bubblechart",hightablesObjTemp.chartTypes)
			var ChartIndiciesBox = find("boxplot",hightablesObjTemp.chartTypes)
			var ChartIndiciesLine = find("linechart",hightablesObjTemp.chartTypes)

			for (j=0;j<ChartIndiciesBar.length;j++)
			{
				highChart = make2dArrayForHighChartsBar(hightablesObjTemp.chartColnames,hightablesObjTemp.data,hightablesObjTemp.chartIndicies[ChartIndiciesBar[j]],hightablesObjTemp.nameIndex)
				makeHighChartBar(highChart,hightablesObjTemp.chartNames[ChartIndiciesBar[j]])
			}
			for (j=0;j<ChartIndiciesBubble.length;j++)
			{
			highChartBubbleByCat = make2dArrayForHighChartsBubbles(hightablesObjTemp.chartColnames,hightablesObjTemp.data,hightablesObjTemp.chartIndicies[ChartIndiciesBubble[j]],hightablesObjTemp.nameIndex)
			makeHighChartBubbleByCategory(highChartBubbleByCat,hightablesObjTemp.chartNames[ChartIndiciesBubble[j]])
			}


			for (j=0;j<ChartIndiciesBox.length;j++)
			{
			console.log(hightablesObjTemp.chartIndicies[ChartIndiciesBox[j]])
			highChartBoxPlot = make2dArrayForHighChartsBoxplot(hightablesObjTemp.chartColnames,hightablesObjTemp.data,hightablesObjTemp.chartIndicies[ChartIndiciesBox[j]],hightablesObjTemp.nameIndex)
			console.log(highChartBoxPlot)
			makeHighChartBoxPlot(highChartBoxPlot,hightablesObjTemp.chartNames[ChartIndiciesBox[[j]]])
			}


			for (j=0;j<ChartIndiciesLine.length;j++)
			{
			console.log(hightablesObjTemp.chartIndicies[ChartIndiciesLine[j]])
			highChartline = make2dArrayForHighChartsLine(hightablesObjTemp.chartColnames,hightablesObjTemp.data,hightablesObjTemp.chartIndicies[ChartIndiciesLine[j]],hightablesObjTemp.nameIndex)
			console.log(highChartline)
			makeHighChartLine(highChartline,hightablesObjTemp.chartNames[ChartIndiciesLine[[j]]])
			}





			}

		}



makeDataTable = function (dataTable,Trial2,Trial3,functionAtRedraw,ToFilter) {

	TempString = '<table cellpadding="0" cellspacing="0" border="0" class="display" id="'
	//TempString2 = 'Example'
	TempString3 = '"></table>'

	var n = TempString.concat(Trial3.replace('#',''),TempString3);
	console.log(n)


	$(Trial2).html(n);
	Tempr = $(Trial3).dataTable( {
		//"sPaginationType": "bootstrap",
		"aaData": dataTable["aaData"],
		"aoColumns": dataTable["aoColumns"],
		"fnDrawCallback": functionAtRedraw,
		"oSearch": {"sSearch": ToFilter}
	} );
	//crazy.fnGetColumnData();


	return Tempr
}




		make2dArrayForDataTable = function (ChartColnames,Data,ChartIndex2,NameIndex) {


										  var FullRow1=new Array(Data.length);
										  var names1 = new Array(Data.length);
										  var Tom1 = new Array(Data.length);
										  var ChartCategories1 = new Array(ChartIndex2.length);




										  for (i=0;i<Data.length;i++)
										  {
										    FullRow1[i] =new Array(ChartIndex2.length)
										    names1[i] = Data[i][NameIndex];
										    for(k=0;k<ChartIndex2.length;k++)
										    {
										      FullRow1[i][k] = Data[i][ChartIndex2[k]] ;
										      ChartCategories1[k] = {"sTitle":ChartColnames[ChartIndex2[k]]}
										    }
										    Tom1[i] = FullRow1[i]
										         ;
										  }
										  dataTable = {"aaData":Tom1,"aoColumns":ChartCategories1}
										  return dataTable
											//console.log(dataTable)
		}


		make2dArrayForHighChartsBar = function (ChartColnames,Data,ChartIndex,NameIndex) {


									var tChartCategories1 = new Array(Data.length);
									var tFullRow = new Array(ChartIndex.length)
									var tnames = new Array(ChartIndex.length);
									var tTom = new Array(ChartIndex.length);
									tNameIndex = [0];
									for(i=0;i < ChartIndex.length;i++)
									{
										tFullRow[i] = new Array(Data.length);
										tnames[i] = ChartColnames[ChartIndex[i]];
										for (k=0;k<Data.length;k++)
										{
											tChartCategories1[k] = Data[k][NameIndex]
											tFullRow[i][k] = Data[k][ChartIndex[i]]
										}
										tTom[i] = {"name":tnames[i],
										"data":tFullRow[i]
										}
									}
									highChart = {"series":tTom,"categories":tChartCategories1}
									return highChart
		}


		make2dArrayForHighChartsBoxplot = function (ChartColnames,Data,ChartIndex,NameIndex) {

									var tChartCategories1 = new Array(Data.length);
									var tNames = new Array(Data.length);
									var tFullRow = new Array(Data.length);

									for(i=0;i < Data.length;i++)
									{
										tFullRow[i] = new Array(ChartIndex.length);
										tNames[i] = Data[i][NameIndex];
										for (k=0;k<ChartIndex.length;k++)
										{
										tFullRow[i][k] = Data[i][ChartIndex[k]];
										}
									}
									highChart = {"series":tFullRow,"categories":tNames}
									return highChart

		}

		make2dArrayForHighChartsBubbles = function (ChartColnames,Data,ChartIndex2,NameIndex) {


										  var FullSeries =new Array(ChartIndex2.length);
										  //var names1 = new Array(Data.length);
										  //var Tom1 = new Array(Data.length);
										  var ChartCategories1 = new Array(Data.length);

										  for (i=0;i<ChartIndex2.length;i++)
										  {

										    var FullRow1 =new Array(Data.length);
										    for(k=0;k<Data.length;k++)
										    {
										    	var PerValue = new Array(3);
										    	PerValue[1] = k
										    	PerValue[0] = Data[k][ChartIndex2[i]]
										  		PerValue[2] = 20
										  		//console.log(PerValue)
										  		FullRow1[k] = PerValue
										  		//console.log(FullRow1[k])
										    }
										  //  Tom1[i] = {"name":ChartColnames[ChartIndex2[i]],
										//		"data":FullRow1
										//	}
											FullSeries[i] = {
											"name":ChartColnames[ChartIndex2[i]],
											"data":FullRow1
											}
										  }

										  for (i=0;i<Data.length;i++)
										  {
										  	ChartCategories1[i] = Data[i][NameIndex]
										  }
										  var BubbleObject = new Array(2)
										  //highChart = {"series":Tom1,"categories":ChartCategories1}
										  //return highChart
										  //console.log(FullSeries)
										 // console.log(ChartCategories1)
										 BubbleObject = {"DataForBubble":FullSeries,"CategoriesForBubble":ChartCategories1};
										 return BubbleObject
		}

		make2dArrayForHighChartsLine = function (ChartColnames,Data,ChartIndex2,NameIndex) {


										  var FullRow1=new Array(Data.length);
										  var names1 = new Array(Data.length);
										  var Tom1 = new Array(Data.length);
										  var ChartCategories1 = new Array(ChartIndex2.length);




										  for (i=0;i<Data.length;i++)
										  {
										    FullRow1[i] =new Array(ChartIndex2.length)
										    names1[i] = Data[i][NameIndex];
										    for(k=0;k<ChartIndex2.length;k++)
										    {
										      FullRow1[i][k] = Data[i][ChartIndex2[k]] ;
										      ChartCategories1[k] = ChartColnames[ChartIndex2[k]]
										    }
										    Tom1[i] = {"name":names1[i],
												"data":FullRow1[i]
											}
										  }
										  highChart = {"series":Tom1,"categories":ChartCategories1}
										  return highChart
		}




function find(key, array) {
  // The variable results needs var in this case (without 'var' a global variable is created)
  var results = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i].indexOf(key) == 0) {
      results.push(i);
    }
  }
  return results;
}

function myFunction()
		{
	//console.log(crazy.fnGetColumnData(0));

	var XML = document.createElement("div");

	var Node = document.createElement("Session");
	Node.setAttribute("genome","hg19")
	Node.setAttribute("groupTracksBy","Linking_id")
	Node.setAttribute("locus","chr3:58135808-58136611")
	Node.setAttribute("version","5")

	ResourcesElement = document.createElement("Resources")

	ResourceElement = document.createElement("Resource")
	ResourceElement.setAttribute("name","AR_HS6_BIC_1_Bigwig")
	ResourceElement.setAttribute("path","C:\Users\carrol09\Desktop\carrollt\ExampleChIP\Coverage\S13-AR-CHIP-LNCAP-LM-HES6-BICALUTAMIDE.bwa_Processed.bw")

	PanelElement = document.createElement("Panel")
	PanelElement.setAttribute("height","40")
	PanelElement.setAttribute("name","")
	PanelElement.setAttribute("width","1115")

	TrackElement = document.createElement("Track")

	TrackElement.setAttribute("altColor","0,0,178")
	TrackElement.setAttribute("autoScale","true")
	TrackElement.setAttribute("color","0,0,178")
	TrackElement.setAttribute("displayMode","COLLAPSED")
	TrackElement.setAttribute("featureVisibilityWindow","-1")
	TrackElement.setAttribute("fontSize","10")
	TrackElement.setAttribute("id","C:/Users/carrol09/Desktop/carrollt/ExampleChIP/Coverage/S13-AR-CHIP-LNCAP-LM-HES6-BICALUTAMIDE.bwa_Processed.bw")
	TrackElement.setAttribute("name","AR_HS6_BIC_1_Bigwig")
	TrackElement.setAttribute("normalize","false")
	TrackElement.setAttribute("renderer","BAR_CHART")
	TrackElement.setAttribute("sortable","true")
	TrackElement.setAttribute("visible","true")
	TrackElement.setAttribute("windowFunction","mean")

	DataRangeElement = document.createElement("DataRange")
	DataRangeElement.setAttribute("altColor","0,0,178")
	DataRangeElement.setAttribute("baseline","0.0")
	DataRangeElement.setAttribute("drawBaseline","true")
	DataRangeElement.setAttribute("flipAxis","false")
	DataRangeElement.setAttribute("maximum","15.0")
	DataRangeElement.setAttribute("minimum","0.0")
	DataRangeElement.setAttribute("type","LINEAR")


	ResourcesElement.appendChild(ResourceElement);
	Node.appendChild(ResourcesElement);
	Node.appendChild(PanelElement);
	PanelElement.appendChild(TrackElement);
	TrackElement.appendChild(DataRangeElement);
	XML.appendChild(Node);

	var xmlText = new XMLSerializer().serializeToString(XML);
	var n = xmlText.replace("<div>","<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>")
	var n2 = n.replace("</div>","")
	var xmlTextNode = document.createTextNode(xmlText);

	//console.log(xmlText)



}


makeHighChartBar = function (highChart,Trial){
			$(Trial).highcharts({
				chart: {
					type: 'bar'
				},
				title: {
					text: 'Stacked bar chart'
				},
				xAxis: {
					categories: highChart["categories"]
				},
				yAxis: {
					min: 0,
					title: {
						text: 'Total fruit consumption'
					}
				},
				legend: {
					backgroundColor: '#FFFFFF',
					reversed: true
				},
				plotOptions: {
					series: {
						stacking: 'normal'
					}
				},
					series: highChart["series"]
			});
}

makeHighChartLine = function (highChart,Trial){
			$(Trial).highcharts({
				chart: {
					type: 'line'
				},
				title: {
					text: 'Stacked bar chart'
				},
				xAxis: {
					categories: highChart["categories"]
				},
				yAxis: {
					min: 0,
					title: {
						text: 'Total fruit consumption'
					}
				},
				legend: {
					backgroundColor: '#FFFFFF',
					reversed: true
					},
				plotOptions: {
				    series: {

					marker: {
					    enabled: false
					}
				    }

				},
					series: highChart["series"]
			});
}


makeHighChartBoxPlot = function (highChart,Trial){
		$(Trial).highcharts({
	    chart: {
	        type: 'boxplot'
	    },

	    title: {
	        text: 'Highcharts Box Plot Example'
	    },


	    xAxis: {
	        categories: highChart["categories"],
	        title: {
	            text: 'Experiment No.'
	        }
	    },

	    yAxis: {
	        title: {
	            text: 'Observations'
	        }
	    },

	    series: [{
	        name: 'Observations',
	        data: highChart["series"]
	    }]

	});
}


makeHighChartBubbleByCategory = function (highChart,Trial){
			$(Trial).highcharts({
				chart: {
					type:'bubble',
					plotBorderWidth: 1,
					zoomType: 'xy'
				},
				title: {
					text: 'Stacked bar chart'
				},

			   yAxis: {
				   min:-0.5,
				   max:highChart["CategoriesForBubble"].length - .5,
				   startOnTick:false,
				   endOnTick:false,
				   categories:highChart["CategoriesForBubble"]
				},

					series: highChart["DataForBubble"]
			});
}
