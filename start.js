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

$(function(){

    var myLayout = new GoldenLayout({
        content: [{
            type: 'column',
            content: [{
                type: 'row',
                content: [{
                    type: 'component',
                    componentName: 'miniwidget',
                    componentState: {
                        tabs: [ 'Indices' ],
                        symbols: {
                            'Indices': [
                                'INDEX:TXSX',
                                'INDEX:FTSE',
                                'INDEX:NZD',
                                'INDEX:SPX'
                            ]
                        }
                    }
                }, {
                    type: 'component',
                    componentName: 'miniwidget',
                    componentState: {
                        tabs: [ 'Misc' ],
                        symbols: {
                            'Misc': [
                                'BTCUSD'
                            ]
                        }
                    }
                }, {
                    type: 'component',
                    componentName: 'miniwidget',
                    componentState: {
                        tabs: [ 'Commodities' ],
                        symbols: {
                            'Commodities': [
                                [ 'Gold', 'GC1!' ],
                                [ 'Silver', 'SI1!' ],
                                [ 'Iron', 'ITI1!' ],
                                [ 'Oil', 'CL1!' ]
                            ]
                        }
                    }
                }, {
                    type: 'component',
                    componentName: 'miniwidget',
                    componentState: {
                        tabs: [ 'Forex' ],
                        symbols: {
                            'Forex': [
                                'CADGBP|3m',
                                'GBPNZD|3m',
                                'GBPEUR|3m',
                                'GBPUSD|3m',
                                'CADUSD|3m',
                            ]
                        }
                    }
                }]
            }, {
                type: 'row',
                content: [
                { type: 'component',
                    componentName: 'chart',
                    componentState: {
                        symbol: 'TSX:XIC',
                        watchlist: [
                            'AMEX:VEA',
                            'AMEX:VWO',
                            'LSE:VFEM',
                            'TSX:XIC'
                        ]
                    }},
                {type: 'component',
                    componentName: 'chart',
                    componentState: {
                        symbol: 'VMW',
                        watchlist: [
                            'NVDA',
                            'ANET',
                        ]
                    }}
                ],
                height: 45,
            }]
        }]
    });

    myLayout.registerComponent( 'example', function( container, state ){ container.getElement().html( '<h2>' + state.text + '</h2>'); });
    myLayout.registerComponent('miniwidget', MiniWidgetComponent);
    myLayout.registerComponent('chart', ChartComponent);
    myLayout.init();
});
