ChartComponent = function(container, state) {
    this._container = container;
    this._state = state;
    this._widget = null;

    this._container.on('open', this._createWidget.bind(this));
}


ChartComponent.prototype._createWidget = function() {
    this._empty_div = TradingView.gId();
    this._container.getElement().append('<div id=' + this._empty_div + '></div>');

    new TradingView.widget({
          "container_id": this._empty_div,
          "autosize": true,
          "symbol": this._state.symbol,
	  "watchlist": this._state.watchlist,
          "interval": "W",
          "timezone": "Etc/UTC",
          "theme": "Black",
          "style": "1",
	  "save_image": false,
          "locale": "en",
//          "toolbar_bg": "#f1f3f6",
          "hideideas": true
    });
}


MiniWidgetComponent = function(container, state) {

    this._container = container;
    this._state = state;
    this._widget = null;

    this._container.on('open', this._createWidget.bind(this));
}

MiniWidgetComponent.prototype._createWidget = function() {

    this._empty_div = TradingView.gId();
    this._container.getElement().append('<div id=' + this._empty_div + '></div>');

    this._widget = new TradingView.MiniWidget({
        "container_id": this._empty_div,
        "tabs": this._state.tabs,
        "symbols": this._state.symbols,
        "gridLineColor": "#E9E9EA",
        "fontColor": "#83888D",
        "underLineColor": "#dbeffb",
        "trendLineColor": "#4bafe9",
        "activeTickerBackgroundColor": "#EDF0F3",
        "large_chart_url": "https://www.tradingview.com/chart/",
        "noGraph": false,
        "width": '100%',
        "height": '100%',
        "locale": "en"
});

}



/********************************
 * * Initialise Layout
 * ********************************/
$(function(){
    var XmyLayout = new GoldenLayout({
        content: [{
            type: 'row',
            content: [{
                type: 'column',
                content: [{
                        type: 'row',
                        content: [{
                            type: 'component',
                            componentName: 'example',
                            componentState: { text: 'r0' }
                        }, {
                            type: 'column',
                            content: [{
                                type: 'component',
                                componentName: 'example',
                                componentState: { text: 'g0' }
                            }, {
                                type: 'component',
                                componentName: 'example',
                                componentState: { text: 'g1' }
                            }]
                    }, {
                        type: 'component',
                        componentName: 'example',
                        componentState: { text: 'r1' }
                    }]
                }]
            }]
        }]
    });

    var YmyLayout = new GoldenLayout({
        content: [{
            type: 'column', 
            content: [{
                type: 'component',
                componentName: 'example',
                componentState: { text: 'r0' }
            }, {
                type: 'component',
                componentName: 'example',
                componentState: { text: 'r1' }
            }]
        }]
    });

var ZmyLayout = new GoldenLayout({
    content: [{
        type: 'row',
        content: [{
            type: 'column',
            width: 61.803,
            content: [{
                type: 'component',
                componentName: 'example',
                componentState: { text: 'A' }
            }]
        }, {
            type: 'column',
            width: 38.197,
            content: [{
                type: 'component',
                componentName: 'example',
                componentState: { text: 'B' },
                height: 61.803
            }, {
                type: 'row',
                content: [{
                    type: 'column',
                    width: 61.803,
                    content: [{
                        type: 'row',
                        content: [{
                            type: 'component',
                            componentName: 'example',
                            componentState: { text: 'C' },
                            width: 61.803,
                        }, {
                            type: 'column',
                           content: [{
                            type: 'component',
                            componentName: 'example',
                            componentState: { text: 'D' },
                            height: 61.803,
                           },{
                            type: 'row',
                             content:[{
                            type: 'component',
                            componentName: 'example',
                            componentState: { text: 'E' },
                           },{
                            type: 'component',
                            componentName: 'example',
                            componentState: { text: 'F' },
                            width: 61.803,
                           }]
                           }]
                        }]
                    }, {
                        type: 'component',
                        componentName: 'example',
                        componentState: { text: 'G' },
                        height: 38.197,
                    }]
                }, {
                    type: 'component',
                    componentName: 'example',
                    componentState: { text: 'H' },
                    width: 61.803
                }]
            }]
        }]
    }]
});


var myLayout = new GoldenLayout({
    content: [{
        type: 'row',
        content: [{
                type: 'row',
                content: [{
                    type: 'column',
                    content: [{
                        type: 'row',
                        content: [{
                            type: 'component',
                            componentName: 'example',
                            componentState: { text: 'C' },
                        }, {
                            type: 'column',
                            height: 16,
                           content: [{
                            height: 16,
                            type: 'component',
                            componentName: 'example',
                            componentState: { text: 'D' },
                           },{
                            type: 'row',
                             content:[{
                            type: 'component',
                            componentName: 'miniwidget',
                            componentState: { 
                                tabs: [ 'Commodities' ],
                                symbols: { 'Commodities': [ 'GC1!' ] } }
                           },{
                            type: 'component',
                            componentName: 'miniwidget',
                            componentState: { 
                                tabs: [ 'Forex' ],
                                symbols: { 'Forex': [ 'FX:GBPCAD', 'FX:GBPNZD', 'GBPEUR', 'FX:GBPUSD' ] } }
                           }]
                           }]
                        }]
                    }, {
                        type: 'component',
                        componentName: 'chart',
                        componentState: { symbol: 'VEA' },
                        height: 38.197,
                    }]
                }]
            }]
        }]
});

//    myLayout.registerComponent( 'stockChart', StockChartComponent );
    myLayout.registerComponent( 'example', function( container, state ){ container.getElement().html( '<h2>' + state.text + '</h2>'); });
    myLayout.registerComponent('miniwidget', MiniWidgetComponent);
    myLayout.registerComponent('chart', ChartComponent);
    myLayout.init();
});

