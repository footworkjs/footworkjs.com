<!doctype html>
<html class="no-js">
  <head>
    <meta charset="utf-8">
    <base href="/">

    <title>{{ $title }}</title>
    <meta name="description" content="{{ $og['description'] }}">

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="generator" content="meat-popsicle">
    <meta name="theme-color" content="#ff5900">

    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ $og['url'] }}">
    <meta property="og:site_name" content="{{ $siteName }}">
    <meta property="og:title" content="{{ $og['title'] }}">
    <meta property="og:description" content="{{ $og['description'] }}">
    @if (!empty($og['image']))
      <meta property="og:image" content="{{ $og['image'] }}">
    @endif

    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@{{ $siteName }}">
    <meta name="twitter:creator" content="@reflectiveSingleton">
    <meta name="twitter:title" content="{{ $og['title'] }}">
    <meta name="twitter:description" content="{{ $og['description'] }}">
    @if (!empty($og['image']))
      <meta name="twitter:image" content="{{ $og['image'] }}">
    @endif

    <link rel="stylesheet" href="{{ asset('/css/setup/icon-fonts/footwork.css') }}">
    <link rel="stylesheet" href="{{ asset('/bower_components/footwork/dist/footwork.css') }}">
    <link href='https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic|Roboto+Slab:400,700|Inconsolata:400,700' rel='stylesheet' type='text/css'>
    <link href="{{ asset('/css/app.css') }}?v={{ $buildVersion }}" rel="stylesheet">
    <link rel="apple-touch-icon-precomposed" href="/images/icon-builds/apple-touch-icon-precomposed.png?v={{ $buildVersion }}">
    <link rel="icon" href="/images/favicon.png?v={{ $buildVersion }}">
    <!--[if IE]><link rel="shortcut icon" href="/images/icon-builds/favicon.ico"><![endif]-->

    @if (isset($isMobile) && $isMobile === true)
      <script>window.isMobile = true;</script>
    @endif
    @if (isset($isTablet) && $isTablet === true)
      <script>window.isTablet = true;</script>
    @endif
    <script>
      window.buildVersion = '{{ $buildVersion }}';
      window.csrfToken = '{{ csrf_token() }}';
    </script>

    <!--[if IE 8]>
      <link rel="stylesheet" href="/css/style-ie.css" type="text/css">
      <script src="/scripts/lib/html5shiv.js"></script>
      <script>window.isCrappyBrowser = true;</script>
    <![endif]-->

    <script>
      /* Modernizr 2.8.3 (Custom Build) | MIT & BSD
       * Build: http://modernizr.com/download/#-csstransforms3d-svg-touch-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes
       */
      ;window.Modernizr=function(a,b,c){function A(a){j.cssText=a}function B(a,b){return A(m.join(a+";")+(b||""))}function C(a,b){return typeof a===b}function D(a,b){return!!~(""+a).indexOf(b)}function E(a,b){for(var d in a){var e=a[d];if(!D(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function F(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:C(f,"function")?f.bind(d||b):f}return!1}function G(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return C(b,"string")||C(b,"undefined")?E(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),F(e,b,c))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v=u.slice,w,x=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},y={}.hasOwnProperty,z;!C(y,"undefined")&&!C(y.call,"undefined")?z=function(a,b){return y.call(a,b)}:z=function(a,b){return b in a&&C(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=v.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(v.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(v.call(arguments)))};return e}),r.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:x(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},r.csstransforms3d=function(){var a=!!G("perspective");return a&&"webkitPerspective"in g.style&&x("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},r.svg=function(){return!!b.createElementNS&&!!b.createElementNS(q.svg,"svg").createSVGRect};for(var H in r)z(r,H)&&(w=H.toLowerCase(),e[w]=r[H](),u.push((e[w]?"":"no-")+w));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)z(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},A(""),i=k=null,e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return E([a])},e.testAllProps=G,e.testStyles=x,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+u.join(" "):""),e}(this,this.document);
    </script>
  </head>

  <body>
    <!--[if IE 8]>
    <div class="unsupported-browser notice">
      <p>Please note that under footwork.js <em>Internet Explorer 8 is unsupported</em> at the moment.</p>
    </div>
    <![endif]-->

    <!--[if lt IE 8]>
    <div class="useless-browser notice">
      <img src="/images/no-ie.jpg" title="Friends don't let friends use ancient IE." alt="Say no to ancient IE">
      <p>You can help stop computer abuse, upgrade to a new browser today.</p>
    </div>
    <![endif]-->

    <!--[if gt IE 7]><!-->
    <router module="MainRouter">
      <viewModel module="Layout">
        <div class="layout" data-bind="class: bodyState, click: bodyClick, style: { minHeight: minHeight }, css: uiState">
          <configuration></configuration>
          <panebackground></panebackground>

          <div class="main-wrapper">
            <viewModel module="Header">
              <header class="main-header desktop-only" data-bind="css: { navReflowing: navReflowing }, transform: closedTransform,
                                                                style: { height: visibleHeight, top: topOffset, borderBottomWidth: borderWidth }">
                <div class="source-link has-trans" data-bind="css: { visible: sourceLinkVisible, forceHidden: sourceLinkHidden }">
                  <a class="button" target="_blank" href="https://github.com/footworkjs/footwork">
                    <span>View on Github</span>
                  </a>
                </div>
                <div class="bottom-highlight"></div>

                <div class="header-bar" data-bind="style: { height: contentHeight }">
                  <panelinks params="inHeader: true">
                    <div class="pane-links">
                      <div class="logo">
                        <a data-bind="$route: '/'">
                          <div class="img-logo no-svg-only"></div>
                          <div class="svg-only">
                            <svg class="page-logo" width="161px" height="30px" viewBox="0 0 161 30">
                              <path fill="none" d="M158.2,27.9c-7,0-14,0-21.1,0c0-8.6,0-17.2,0-25.8c7,0,14,0,21.1,0C158.2,10.7,158.2,19.3,158.2,27.9z
                                 M155.1,16.3c0-1-0.2-1.8-0.5-2.5c-0.5-1.3-1.3-2.4-2.2-3.4c-0.7-0.8-1.4-1.5-2.4-1.9c-0.7-0.3-1.4-0.3-2.2,0.1
                                c-0.6,0.3-1,0.8-1.3,1.4c-0.5,0.9-0.5,1.9-0.3,2.9c0.1,0.9,0.4,1.9,0.3,2.8c-0.1,1.4-0.8,2.5-1.9,3.3c-0.7,0.5-1.5,0.6-2.3,0.7
                                c-0.8,0.1-1.6,0.2-2.3,0.6c-1.3,0.6-2.1,1.6-2.5,2.9c-0.3,0.7-0.2,1.5,0.1,2.2c0.4,0.8,1,1.3,1.6,1.8c0.5,0.4,1,0.5,1.6,0.5
                                c1.3,0.1,2.4-0.5,3.2-1.4c1.1-1.3,2.3-2.3,3.8-3c0.8-0.4,1.6-0.7,2.4-1.1c1.5-0.7,2.8-1.7,3.8-3C154.6,18.4,155.1,17.4,155.1,16.3
                                z M149.6,5.4c0,1.3,0.8,1.9,1.9,1.5c1.3-0.5,2.4-2.3,2-3.7c-0.2-0.9-1-1.3-1.8-1C150.6,2.7,149.7,4,149.6,5.4z M155.8,7.1
                                c0.1-1.1-0.5-1.6-1.4-1.4c-0.8,0.2-1.6,1.4-1.5,2.3c0.1,0.9,0.8,1.3,1.6,0.9C155.3,8.5,155.7,7.8,155.8,7.1z M157.4,9.3
                                c0-0.6-0.4-0.9-1-0.8c-0.8,0.1-1.5,1-1.5,1.8c0,0.6,0.4,1,1,0.8C156.7,11,157.4,10.1,157.4,9.3z M156.7,13c0.6,0,1.2-0.5,1.4-1.1
                                c0.1-0.5-0.2-0.9-0.7-0.9c-0.6,0-1.3,0.5-1.4,1.1C155.9,12.6,156.1,13,156.7,13z M156.3,14.3c0,0.4,0.3,0.6,0.7,0.5
                                c0.5-0.1,0.9-0.6,0.9-1.1c0-0.4-0.3-0.7-0.7-0.6C156.8,13.3,156.3,13.8,156.3,14.3z"/>
                              <g class="foot">
                                <path d="M155.1,16.3c0,1-0.4,2.1-1.1,3c-1,1.3-2.3,2.3-3.8,3c-0.8,0.4-1.6,0.7-2.4,1.1c-1.5,0.7-2.7,1.8-3.8,3
                                  c-0.8,0.9-1.9,1.4-3.2,1.4c-0.6,0-1.1-0.2-1.6-0.5c-0.7-0.5-1.3-1.1-1.6-1.8c-0.4-0.7-0.4-1.5-0.1-2.2c0.5-1.3,1.3-2.3,2.5-2.9
                                  c0.7-0.4,1.5-0.4,2.3-0.6c0.8-0.1,1.6-0.3,2.3-0.7c1.1-0.8,1.8-1.9,1.9-3.3c0.1-1-0.2-1.9-0.3-2.8c-0.1-1-0.2-2,0.3-2.9
                                  c0.3-0.6,0.7-1.1,1.3-1.4c0.7-0.4,1.4-0.4,2.2-0.1c1,0.4,1.7,1.1,2.4,1.9c0.9,1,1.7,2.1,2.2,3.4C154.9,14.6,155.1,15.4,155.1,16.3
                                  z"/>
                                <path d="M149.6,5.4c0-1.3,0.9-2.7,2.1-3.1c0.8-0.3,1.6,0.1,1.8,1c0.3,1.3-0.7,3.2-2,3.7C150.4,7.3,149.6,6.6,149.6,5.4z"/>
                                <path d="M155.8,7.1c-0.1,0.7-0.5,1.4-1.4,1.8c-0.8,0.4-1.5,0-1.6-0.9c-0.1-0.9,0.7-2,1.5-2.3C155.3,5.5,155.9,6,155.8,7.1z"/>
                                <path d="M157.4,9.3c0,0.8-0.7,1.7-1.5,1.8c-0.6,0.1-1-0.2-1-0.8c0-0.8,0.7-1.6,1.5-1.8C157,8.4,157.4,8.7,157.4,9.3z"/>
                                <path d="M156.7,13c-0.5,0-0.8-0.4-0.7-0.8c0.1-0.6,0.8-1.1,1.4-1.1c0.5,0,0.8,0.4,0.7,0.9C157.9,12.4,157.3,13,156.7,13z"/>
                                <path d="M156.3,14.3c0-0.5,0.4-1.1,0.9-1.1c0.4-0.1,0.7,0.2,0.7,0.6c0,0.5-0.4,1-0.9,1.1C156.6,15,156.3,14.7,156.3,14.3z"/>
                                <path d="M111.7,22.1c0-1,0.7-1.8,1.7-1.8c1,0,1.7,0.7,1.7,1.8c0,1-0.6,1.8-1.7,1.8C112.4,23.9,111.7,23.1,111.7,22.1z"/>
                              </g>
                              <g class="footwork">
                                <path d="M6,23.6V11.9H4.1V10H6V9.4c0-1.9,0.4-3.6,1.6-4.7c0.9-0.9,2.2-1.3,3.3-1.3c0.9,0,1.6,0.2,2.1,0.4l-0.3,1.9
                                  c-0.4-0.2-0.9-0.3-1.6-0.3c-2.1,0-2.6,1.8-2.6,3.9V10h3.3v1.9H8.4v11.7H6z"/>
                                <path d="M25.8,16.7c0,5-3.5,7.2-6.7,7.2c-3.7,0-6.5-2.7-6.5-7c0-4.5,3-7.2,6.7-7.2C23.1,9.7,25.8,12.5,25.8,16.7z M15,16.8
                                  c0,3,1.7,5.2,4.1,5.2c2.4,0,4.1-2.2,4.1-5.3c0-2.3-1.1-5.2-4.1-5.2S15,14.3,15,16.8z"/>
                                <path d="M41.2,16.7c0,5-3.5,7.2-6.7,7.2c-3.7,0-6.5-2.7-6.5-7c0-4.5,3-7.2,6.7-7.2C38.5,9.7,41.2,12.5,41.2,16.7z M30.4,16.8
                                  c0,3,1.7,5.2,4.1,5.2c2.4,0,4.1-2.2,4.1-5.3c0-2.3-1.1-5.2-4.1-5.2S30.4,14.3,30.4,16.8z"/>
                                <path d="M47.2,6.1V10h3.5v1.9h-3.5v7.3c0,1.7,0.5,2.6,1.8,2.6c0.6,0,1.1-0.1,1.4-0.2l0.1,1.8c-0.5,0.2-1.2,0.3-2.2,0.3
                                  c-1.1,0-2.1-0.4-2.7-1c-0.7-0.7-1-1.9-1-3.5v-7.4h-2.1V10h2.1V6.8L47.2,6.1z"/>
                                <path d="M54.8,10l1.8,6.9c0.4,1.5,0.8,2.9,1,4.3h0.1c0.3-1.4,0.8-2.8,1.2-4.3l2.2-6.9h2.1l2.1,6.8c0.5,1.6,0.9,3.1,1.2,4.4h0.1
                                  c0.2-1.4,0.6-2.8,1-4.4l1.9-6.8h2.4l-4.4,13.6h-2.2l-2.1-6.5c-0.5-1.5-0.9-2.9-1.2-4.5H62c-0.3,1.6-0.8,3-1.2,4.5l-2.2,6.4h-2.2
                                  L52.2,10H54.8z"/>
                                <path d="M86.4,16.7c0,5-3.5,7.2-6.7,7.2c-3.7,0-6.5-2.7-6.5-7c0-4.5,3-7.2,6.7-7.2C83.7,9.7,86.4,12.5,86.4,16.7z M75.6,16.8
                                  c0,3,1.7,5.2,4.1,5.2c2.4,0,4.1-2.2,4.1-5.3c0-2.3-1.1-5.2-4.1-5.2C76.9,11.6,75.6,14.3,75.6,16.8z"/>
                                <path d="M89.5,14.3c0-1.6,0-3-0.1-4.2h2.2l0.1,2.7h0.1c0.6-1.8,2.1-3,3.8-3c0.3,0,0.5,0,0.7,0.1v2.3c-0.3-0.1-0.5-0.1-0.8-0.1
                                  c-1.7,0-3,1.3-3.3,3.2c-0.1,0.3-0.1,0.7-0.1,1.1v7.2h-2.4V14.3z"/>
                                <path d="M101.2,16.2L101.2,16.2c0.4-0.5,0.9-1.1,1.3-1.5l4-4.7h3l-5.2,5.6l6,8h-3l-4.7-6.5l-1.3,1.4v5.1h-2.4V3.7h2.4V16.2z"/>
                              </g>
                              <g class="js">
                                <path d="M114.8,27.5c1.1-0.1,2.1-0.4,2.7-1c0.7-0.8,0.9-1.8,0.9-5.1V10h2.5v12.3c0,2.6-0.4,4.3-1.6,5.6c-1.1,1.1-2.9,1.5-4.2,1.5
                                  L114.8,27.5z M121.1,6.2c0,0.8-0.6,1.5-1.5,1.5c-0.9,0-1.5-0.7-1.5-1.5c0-0.9,0.6-1.5,1.6-1.5C120.5,4.7,121.1,5.3,121.1,6.2z"/>
                                <path d="M124.5,21.1c0.7,0.5,2,1,3.2,1c1.8,0,2.6-0.9,2.6-2c0-1.2-0.7-1.8-2.5-2.5c-2.4-0.9-3.6-2.2-3.6-3.8c0-2.2,1.8-4,4.7-4
                                  c1.4,0,2.6,0.4,3.3,0.8l-0.6,1.8c-0.5-0.3-1.5-0.8-2.8-0.8c-1.5,0-2.3,0.8-2.3,1.8c0,1.1,0.8,1.6,2.6,2.3c2.4,0.9,3.6,2.1,3.6,4.1
                                  c0,2.4-1.8,4.1-5.1,4.1c-1.5,0-2.9-0.4-3.8-0.9L124.5,21.1z"/>
                              </g>
                            </svg>
                          </div>
                        </a>
                      </div>
                    </div>
                  </panelinks>

                  <viewModel module="Navigation">
                    <nav data-bind="style: { marginLeft: offsetMargin }">
                      <div class="main-load-bar">
                        <div class="load-bar loaded" data-bind="class: loader.state, transition: loader.stepTransition, style: { top: loadBarTopPos, width: loader.percentComplete }">
                          <div class="shadow"></div>
                          <div class="error" data-bind="text: loader.message"></div>
                        </div>
                      </div>

                      <navmenu params="inHeader: true"></navmenu>

                      <div class="drop-top js-only has-trans" data-bind="css: { visible: headerDropVisible, active: headerOpen, hidden: dropHidden }, click: toggleHeader">
                        <span class="icon" data-bind="class: arrowIcon"></span>
                        <div class="info" data-bind="html: dropInfoText">Click to expand the header. <span class="shortcut">ctrl + x</span></div>
                      </div>
                    </nav>
                  </viewModel>
                </div>
              </header>
            </viewModel>

            <viewModel module="Navigation">
              <nav class="mobile-header js-navigation">
                <div class="load-bar loaded" data-bind="class: loader.state, transition: loader.stepTransition, style: { width: loader.percentComplete }">
                  <div class="message" data-bind="text: loader.message">Loading...</div>
                </div>
                <a class="page-logo" data-bind="$route: '/'">
                  <svg width="161px" height="30px" viewBox="0 0 161 30">
                    <path fill="none" d="M158.2,27.9c-7,0-14,0-21.1,0c0-8.6,0-17.2,0-25.8c7,0,14,0,21.1,0C158.2,10.7,158.2,19.3,158.2,27.9z
                       M155.1,16.3c0-1-0.2-1.8-0.5-2.5c-0.5-1.3-1.3-2.4-2.2-3.4c-0.7-0.8-1.4-1.5-2.4-1.9c-0.7-0.3-1.4-0.3-2.2,0.1
                      c-0.6,0.3-1,0.8-1.3,1.4c-0.5,0.9-0.5,1.9-0.3,2.9c0.1,0.9,0.4,1.9,0.3,2.8c-0.1,1.4-0.8,2.5-1.9,3.3c-0.7,0.5-1.5,0.6-2.3,0.7
                      c-0.8,0.1-1.6,0.2-2.3,0.6c-1.3,0.6-2.1,1.6-2.5,2.9c-0.3,0.7-0.2,1.5,0.1,2.2c0.4,0.8,1,1.3,1.6,1.8c0.5,0.4,1,0.5,1.6,0.5
                      c1.3,0.1,2.4-0.5,3.2-1.4c1.1-1.3,2.3-2.3,3.8-3c0.8-0.4,1.6-0.7,2.4-1.1c1.5-0.7,2.8-1.7,3.8-3C154.6,18.4,155.1,17.4,155.1,16.3
                      z M149.6,5.4c0,1.3,0.8,1.9,1.9,1.5c1.3-0.5,2.4-2.3,2-3.7c-0.2-0.9-1-1.3-1.8-1C150.6,2.7,149.7,4,149.6,5.4z M155.8,7.1
                      c0.1-1.1-0.5-1.6-1.4-1.4c-0.8,0.2-1.6,1.4-1.5,2.3c0.1,0.9,0.8,1.3,1.6,0.9C155.3,8.5,155.7,7.8,155.8,7.1z M157.4,9.3
                      c0-0.6-0.4-0.9-1-0.8c-0.8,0.1-1.5,1-1.5,1.8c0,0.6,0.4,1,1,0.8C156.7,11,157.4,10.1,157.4,9.3z M156.7,13c0.6,0,1.2-0.5,1.4-1.1
                      c0.1-0.5-0.2-0.9-0.7-0.9c-0.6,0-1.3,0.5-1.4,1.1C155.9,12.6,156.1,13,156.7,13z M156.3,14.3c0,0.4,0.3,0.6,0.7,0.5
                      c0.5-0.1,0.9-0.6,0.9-1.1c0-0.4-0.3-0.7-0.7-0.6C156.8,13.3,156.3,13.8,156.3,14.3z"/>
                    <g class="foot">
                      <path d="M155.1,16.3c0,1-0.4,2.1-1.1,3c-1,1.3-2.3,2.3-3.8,3c-0.8,0.4-1.6,0.7-2.4,1.1c-1.5,0.7-2.7,1.8-3.8,3
                        c-0.8,0.9-1.9,1.4-3.2,1.4c-0.6,0-1.1-0.2-1.6-0.5c-0.7-0.5-1.3-1.1-1.6-1.8c-0.4-0.7-0.4-1.5-0.1-2.2c0.5-1.3,1.3-2.3,2.5-2.9
                        c0.7-0.4,1.5-0.4,2.3-0.6c0.8-0.1,1.6-0.3,2.3-0.7c1.1-0.8,1.8-1.9,1.9-3.3c0.1-1-0.2-1.9-0.3-2.8c-0.1-1-0.2-2,0.3-2.9
                        c0.3-0.6,0.7-1.1,1.3-1.4c0.7-0.4,1.4-0.4,2.2-0.1c1,0.4,1.7,1.1,2.4,1.9c0.9,1,1.7,2.1,2.2,3.4C154.9,14.6,155.1,15.4,155.1,16.3
                        z"/>
                      <path d="M149.6,5.4c0-1.3,0.9-2.7,2.1-3.1c0.8-0.3,1.6,0.1,1.8,1c0.3,1.3-0.7,3.2-2,3.7C150.4,7.3,149.6,6.6,149.6,5.4z"/>
                      <path d="M155.8,7.1c-0.1,0.7-0.5,1.4-1.4,1.8c-0.8,0.4-1.5,0-1.6-0.9c-0.1-0.9,0.7-2,1.5-2.3C155.3,5.5,155.9,6,155.8,7.1z"/>
                      <path d="M157.4,9.3c0,0.8-0.7,1.7-1.5,1.8c-0.6,0.1-1-0.2-1-0.8c0-0.8,0.7-1.6,1.5-1.8C157,8.4,157.4,8.7,157.4,9.3z"/>
                      <path d="M156.7,13c-0.5,0-0.8-0.4-0.7-0.8c0.1-0.6,0.8-1.1,1.4-1.1c0.5,0,0.8,0.4,0.7,0.9C157.9,12.4,157.3,13,156.7,13z"/>
                      <path d="M156.3,14.3c0-0.5,0.4-1.1,0.9-1.1c0.4-0.1,0.7,0.2,0.7,0.6c0,0.5-0.4,1-0.9,1.1C156.6,15,156.3,14.7,156.3,14.3z"/>
                      <path d="M111.7,22.1c0-1,0.7-1.8,1.7-1.8c1,0,1.7,0.7,1.7,1.8c0,1-0.6,1.8-1.7,1.8C112.4,23.9,111.7,23.1,111.7,22.1z"/>
                    </g>
                    <g class="footwork">
                      <path d="M6,23.6V11.9H4.1V10H6V9.4c0-1.9,0.4-3.6,1.6-4.7c0.9-0.9,2.2-1.3,3.3-1.3c0.9,0,1.6,0.2,2.1,0.4l-0.3,1.9
                        c-0.4-0.2-0.9-0.3-1.6-0.3c-2.1,0-2.6,1.8-2.6,3.9V10h3.3v1.9H8.4v11.7H6z"/>
                      <path d="M25.8,16.7c0,5-3.5,7.2-6.7,7.2c-3.7,0-6.5-2.7-6.5-7c0-4.5,3-7.2,6.7-7.2C23.1,9.7,25.8,12.5,25.8,16.7z M15,16.8
                        c0,3,1.7,5.2,4.1,5.2c2.4,0,4.1-2.2,4.1-5.3c0-2.3-1.1-5.2-4.1-5.2S15,14.3,15,16.8z"/>
                      <path d="M41.2,16.7c0,5-3.5,7.2-6.7,7.2c-3.7,0-6.5-2.7-6.5-7c0-4.5,3-7.2,6.7-7.2C38.5,9.7,41.2,12.5,41.2,16.7z M30.4,16.8
                        c0,3,1.7,5.2,4.1,5.2c2.4,0,4.1-2.2,4.1-5.3c0-2.3-1.1-5.2-4.1-5.2S30.4,14.3,30.4,16.8z"/>
                      <path d="M47.2,6.1V10h3.5v1.9h-3.5v7.3c0,1.7,0.5,2.6,1.8,2.6c0.6,0,1.1-0.1,1.4-0.2l0.1,1.8c-0.5,0.2-1.2,0.3-2.2,0.3
                        c-1.1,0-2.1-0.4-2.7-1c-0.7-0.7-1-1.9-1-3.5v-7.4h-2.1V10h2.1V6.8L47.2,6.1z"/>
                      <path d="M54.8,10l1.8,6.9c0.4,1.5,0.8,2.9,1,4.3h0.1c0.3-1.4,0.8-2.8,1.2-4.3l2.2-6.9h2.1l2.1,6.8c0.5,1.6,0.9,3.1,1.2,4.4h0.1
                        c0.2-1.4,0.6-2.8,1-4.4l1.9-6.8h2.4l-4.4,13.6h-2.2l-2.1-6.5c-0.5-1.5-0.9-2.9-1.2-4.5H62c-0.3,1.6-0.8,3-1.2,4.5l-2.2,6.4h-2.2
                        L52.2,10H54.8z"/>
                      <path d="M86.4,16.7c0,5-3.5,7.2-6.7,7.2c-3.7,0-6.5-2.7-6.5-7c0-4.5,3-7.2,6.7-7.2C83.7,9.7,86.4,12.5,86.4,16.7z M75.6,16.8
                        c0,3,1.7,5.2,4.1,5.2c2.4,0,4.1-2.2,4.1-5.3c0-2.3-1.1-5.2-4.1-5.2C76.9,11.6,75.6,14.3,75.6,16.8z"/>
                      <path d="M89.5,14.3c0-1.6,0-3-0.1-4.2h2.2l0.1,2.7h0.1c0.6-1.8,2.1-3,3.8-3c0.3,0,0.5,0,0.7,0.1v2.3c-0.3-0.1-0.5-0.1-0.8-0.1
                        c-1.7,0-3,1.3-3.3,3.2c-0.1,0.3-0.1,0.7-0.1,1.1v7.2h-2.4V14.3z"/>
                      <path d="M101.2,16.2L101.2,16.2c0.4-0.5,0.9-1.1,1.3-1.5l4-4.7h3l-5.2,5.6l6,8h-3l-4.7-6.5l-1.3,1.4v5.1h-2.4V3.7h2.4V16.2z"/>
                    </g>
                    <g class="js">
                      <path d="M114.8,27.5c1.1-0.1,2.1-0.4,2.7-1c0.7-0.8,0.9-1.8,0.9-5.1V10h2.5v12.3c0,2.6-0.4,4.3-1.6,5.6c-1.1,1.1-2.9,1.5-4.2,1.5
                        L114.8,27.5z M121.1,6.2c0,0.8-0.6,1.5-1.5,1.5c-0.9,0-1.5-0.7-1.5-1.5c0-0.9,0.6-1.5,1.6-1.5C120.5,4.7,121.1,5.3,121.1,6.2z"/>
                      <path d="M124.5,21.1c0.7,0.5,2,1,3.2,1c1.8,0,2.6-0.9,2.6-2c0-1.2-0.7-1.8-2.5-2.5c-2.4-0.9-3.6-2.2-3.6-3.8c0-2.2,1.8-4,4.7-4
                        c1.4,0,2.6,0.4,3.3,0.8l-0.6,1.8c-0.5-0.3-1.5-0.8-2.8-0.8c-1.5,0-2.3,0.8-2.3,1.8c0,1.1,0.8,1.6,2.6,2.3c2.4,0.9,3.6,2.1,3.6,4.1
                        c0,2.4-1.8,4.1-5.1,4.1c-1.5,0-2.9-0.4-3.8-0.9L124.5,21.1z"/>
                    </g>
                  </svg>
                </a>
              </nav>
            </viewModel>

            <div class="main-content" data-bind="style: { paddingTop: mainContentTopOffset }">
              <pane></pane>

              <svg id="cornerFoot" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 136 203.4">
              <g class="Step">
                <path fill="#eeeeee" d="M24.1,106.6c-0.4,7.7,2.1,15.7,7,22.9c7,10.5,16.2,18.4,27.2,24.4c5.7,3.2,11.5,6.3,17.1,9.5
                  c11.1,6.3,19.7,14.9,27.3,25c5.8,7.5,13.5,11.9,23.2,12.2c4.4,0.2,8.5-1,12.3-3.3c5.3-3.4,10-7.5,13.4-13
                  c3.2-5.3,4.1-10.8,2.3-16.7c-2.9-9.8-8.5-18-17.7-23.1c-5.3-3.1-11.4-4.1-17.1-5.6c-5.9-1.5-11.8-2.8-16.7-6.8
                  c-8.2-6.5-12.6-15.1-12.7-25.5c0-7.2,2.2-14.2,3.8-21.2c1.6-7.4,2.4-14.7-1-21.9c-2.1-4.6-5-8.5-9.2-11.4
                  c-5.1-3.3-10.6-3.6-16.2-1.7c-7.7,2.5-13.6,7.5-19.4,12.8C40.1,70.3,33.5,78.3,29,87.7C26.4,93.5,24.7,99.4,24.1,106.6z"/>
                <path fill="#eeeeee" d="M70.9,27c0.4-10.1-5.7-20.5-14.5-24.5C50.2-0.3,44.1,2.3,42,8.9c-3.1,9.8,3.8,24.5,13.4,28.7
                  C63.7,41.1,70.5,36.4,70.9,27z"/>
                <path fill="#eeeeee" d="M23.2,36.7c0.3,5.2,3.3,10.7,9.3,14.2c5.8,3.4,11.1,0.6,12.2-6c1-6.5-4.1-15.6-10.3-17.9
                  C28.2,24.9,23.4,28.2,23.2,36.7z"/>
                <path fill="#eeeeee" d="M9.9,52.5C9.5,58.4,14.3,65.4,20,66.9c4.5,1.3,7.7-1.2,8-5.7c0.4-5.9-4.6-12.8-10.2-14.2
                  C13.4,45.7,10.2,47.9,9.9,52.5z"/>
                <path fill="#eeeeee" d="M13.8,80.4c3.9,0.3,6.2-2.2,5.6-6c-0.7-4.6-5.5-9-10.1-9.3c-3.9-0.3-6.2,2.4-5.5,6.2
                  C4.6,75.7,9.3,80.1,13.8,80.4z"/>
                <path fill="#eeeeee" d="M15.6,90.8c0.3-3.9-2.8-8.2-6.5-9.2c-3-0.7-5.3,1-5.2,4c-0.1,3.7,2.8,7.8,6.3,8.9
                  C13.1,95.5,15.4,93.9,15.6,90.8z"/>
              </g>
              </svg>

              <div class="main-pane has-layout-trans" data-bind="css: { configVisible: configVisible }, style: { marginLeft: mainContentOffset }">
                <main class="js-main">
                  <outlet name="mainContent">
                    @yield('mainContent')
                  </outlet>
                </main>
                <div id="collapse-button" class="has-layout-trans js-only"
                     data-bind="click: togglePaneCollapse,
                                style: { top: topOffset, left: leftOffset }, transition: paneTransition, transform: transform">
                  <div class="arrow"></div>
                  <svg class="inner-arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 40 50" enable-background="new 0 0 40 50" xml:space="preserve">
                    <polygon class="open" fill="#0B61A4" points="12,25 24,6.2 24,8.1 16,25 24,42.1 24,44.2 "/>
                    <polygon class="collapsed" fill="#F8F8F8" points="28.1,25 16.2,6.2 16.2,8.1 24.2,25 16.2,42.1 16.2,44.2 "/>
                  </svg>
                </div>
              </div>
            </div>

            <viewModel module="Footer">
              <div class="push" data-bind="style: { height: height }"></div>
            </viewModel>
          </div>

          <viewModel module="Footer">
            <footer>
              <div class="content has-layout-trans" data-bind="style: { marginLeft: columnWidth }">
                <div class="layout-mode js-only" data-bind="class: viewPortLayoutMode">
                  <div class="icon desktop icon-screen" data-bind="click: setMode" data-mode="desktop"></div>
                  <div class="icon mobile icon-mobile" data-bind="click: setMode" data-mode="mobile"></div>
                </div>

                <input type="checkbox" class="hidden" id="no-js-hidden">
                <div class="no-js notice">
                  <div class="icon icon-warning-sign"></div>
                  <p> For this website to work you will need to enable javascript execution. I promise, nothing bad will happen...</p>
                  <label for="no-js-hidden" class="button">Ok</label>
                </div>

                <div id="html5-badge" class="svg-only">
                  <!-- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5 -->
                  <svg class="background" width="192px" height="45px" viewBox="0 0 271.667 63.858">
                    <polygon fill="#D9D9D9" points="48,9.929 264.333,9.929 271.667,30.68 264.333,52.096 48,52.096 "/>
                    <path fill="#E34F26" d="M5.114,57.373L0,0h56.25l-5.114,57.373l-23.074,6.486"/>
                    <path fill="#EF652A" d="M28.187,58.869l18.584-5.114l4.365-49.141H28.187"/>
                    <path fill="#EBEBEB" d="M28.187,25.942h-9.354l-0.624-7.234h9.978v-6.984h-0.125H10.477l0.125,1.871l1.746,19.457h15.84V25.942z M28.187,44.277h-0.125l-7.858-2.12l-0.499-5.613h-3.742h-3.243l0.873,11.1l14.468,3.991h0.125V44.277z"/>
                    <path fill="#FFFFFF" d="M28.063,25.942v7.109h8.731l-0.873,9.105l-7.858,2.12v7.359l14.468-3.991l0.125-1.247l1.621-18.584 l0.249-1.871H42.53H28.063z M28.063,11.724v4.365v2.619l0,0H45.15l0,0l0,0l0.125-1.497l0.374-3.617l0.125-1.871H28.063z"/>
                  </svg>

                  <div class="controls">
                    <div class="feature graphics">
                      <div class="facet top">
                        <div class="pop-up">
                          <div class="title">3D, Graphics &amp; Effects</div>
                          <div class="arrow"></div>
                        </div>
                        <svg viewBox="0 0 19.583 17.708">
                          <path fill="#999999" d="M10.615,0l-5.03,1.622l10.9,3.53v6.954l-7.264,2.348L3.09,12.474V5.658l5.927,1.916l5.03-1.622L3.131,2.413 L0,3.432v11.291l9.221,2.984l10.362-3.351V2.894L10.615,0z"/>
                          <title>3D, GRAPHICS &amp; EFFECTS</title>
                        </svg>
                      </div>
                      <div class="facet face">
                        <svg viewBox="0 0 19.583 17.708">
                          <path fill="#999999" d="M10.615,0l-5.03,1.622l10.9,3.53v6.954l-7.264,2.348L3.09,12.474V5.658l5.927,1.916l5.03-1.622L3.131,2.413 L0,3.432v11.291l9.221,2.984l10.362-3.351V2.894L10.615,0z"/>
                          <title>3D, GRAPHICS &amp; EFFECTS</title>
                        </svg>
                      </div>
                    </div>
                    <div class="feature css3">
                      <div class="facet top">
                        <div class="pop-up">
                          <div class="title">CSS Styling</div>
                          <div class="arrow"></div>
                        </div>
                        <svg viewBox="0 0 19.563 17.708">
                          <title>CSS Styling Logo</title>
                          <path fill="#999999" d="M2.911,0L2.254,3.284h13.367l-0.417,2.121H1.828L1.181,8.69h13.367l-0.746,3.746l-5.388,1.784l-4.669-1.784 l0.32-1.624H0.781L0,14.752l7.722,2.956l8.903-2.956l1.181-5.929l0.24-1.189L19.563,0H2.911z"/>
                        </svg>
                      </div>
                      <div class="facet face">
                        <svg viewBox="0 0 19.563 17.708">
                          <title>CSS Styling Logo</title>
                          <path fill="#999999" d="M2.911,0L2.254,3.284h13.367l-0.417,2.121H1.828L1.181,8.69h13.367l-0.746,3.746l-5.388,1.784l-4.669-1.784 l0.32-1.624H0.781L0,14.752l7.722,2.956l8.903-2.956l1.181-5.929l0.24-1.189L19.563,0H2.911z"/>
                        </svg>
                      </div>
                    </div>
                    <div class="feature device">
                      <div class="facet top">
                        <div class="pop-up">
                          <div class="title">Device Access</div>
                          <div class="arrow"></div>
                        </div>
                        <svg viewBox="0 0 18.764 17.708">
                          <title>Device Access Logo</title>
                          <path fill="#999999" d="M13.619,3.808L17.426,0h-4.081L9.393,3.952L5.434,0H1.353L5.16,3.808H0v13.9h2.713h2.941h1.132l2.592-2.592 l2.592,2.592h1.505h2.576h2.713v-13.9H13.619z M9.386,11.027L5.601,14.82H2.888V6.695h13.003v8.124h-2.713L9.386,11.027z"/>
                        </svg>
                      </div>
                      <div class="facet face">
                        <svg viewBox="0 0 18.764 17.708">
                          <title>Device Access Logo</title>
                          <path fill="#999999" d="M13.619,3.808L17.426,0h-4.081L9.393,3.952L5.434,0H1.353L5.16,3.808H0v13.9h2.713h2.941h1.132l2.592-2.592 l2.592,2.592h1.505h2.576h2.713v-13.9H13.619z M9.386,11.027L5.601,14.82H2.888V6.695h13.003v8.124h-2.713L9.386,11.027z"/>
                        </svg>
                      </div>
                    </div>
                    <div class="feature storage">
                      <div class="facet top">
                        <div class="pop-up">
                          <div class="title">Storage</div>
                          <div class="arrow"></div>
                        </div>
                        <svg viewBox="0 0 20.319 17.708">
                          <title>Offline Storage</title>
                          <path fill="#999999" d="M20.319,5.458h-3.302C15.663,2.204,12.436,0,8.85,0C3.973,0,0,3.966,0,8.85s3.973,8.857,8.85,8.857 c3.586,0,6.805-2.197,8.166-5.458h3.296V5.458H20.319z M17.694,9.617H8.85c-0.421,0-0.767-0.339-0.767-0.767 c0-0.421,0.339-0.767,0.767-0.767h8.837v1.534H17.694z M8.85,15.082c-3.434,0-6.225-2.791-6.225-6.225S5.417,2.632,8.85,2.632 c2.128,0,4.083,1.105,5.216,2.833H8.85c-1.865,0-3.392,1.52-3.392,3.392c0,1.865,1.52,3.392,3.392,3.392h5.216 C12.94,13.977,10.985,15.082,8.85,15.082z"/>
                        </svg>
                      </div>
                      <div class="facet face">
                        <svg viewBox="0 0 20.319 17.708">
                          <title>Offline Storage</title>
                          <path fill="#999999" d="M20.319,5.458h-3.302C15.663,2.204,12.436,0,8.85,0C3.973,0,0,3.966,0,8.85s3.973,8.857,8.85,8.857 c3.586,0,6.805-2.197,8.166-5.458h3.296V5.458H20.319z M17.694,9.617H8.85c-0.421,0-0.767-0.339-0.767-0.767 c0-0.421,0.339-0.767,0.767-0.767h8.837v1.534H17.694z M8.85,15.082c-3.434,0-6.225-2.791-6.225-6.225S5.417,2.632,8.85,2.632 c2.128,0,4.083,1.105,5.216,2.833H8.85c-1.865,0-3.392,1.52-3.392,3.392c0,1.865,1.52,3.392,3.392,3.392h5.216 C12.94,13.977,10.985,15.082,8.85,15.082z"/>
                        </svg>
                      </div>
                    </div>
                    <div class="feature performance">
                      <div class="facet top">
                      <div class="pop-up">
                        <div class="title">Performance and Integration</div>
                        <div class="arrow"></div>
                      </div>
                        <svg viewBox="0 0 17.708 17.708">
                          <title>Performance and Integration</title>
                          <path fill="#999999" d="M17.587,7.385l-2.59-1.074l1.067-2.575c-0.272-0.381-0.567-0.741-0.891-1.069 c-0.019-0.021-0.039-0.042-0.059-0.063c-0.033-0.033-0.069-0.065-0.105-0.098c-0.317-0.311-0.666-0.593-1.033-0.858l-2.575,1.065 l-1.074-2.59C9.393-0.035,8.451-0.039,7.54,0.1C7.524,0.102,7.509,0.103,7.496,0.105C7.456,0.11,7.418,0.119,7.383,0.127 L6.309,2.711l-2.59-1.072C2.945,2.191,2.273,2.855,1.724,3.605C1.719,3.612,1.713,3.62,1.707,3.628 C1.684,3.659,1.662,3.692,1.641,3.725l1.07,2.583l-2.59,1.075c-0.155,0.933-0.16,1.872-0.023,2.782 c0.002,0.016,0.003,0.034,0.006,0.049c0.005,0.038,0.012,0.075,0.019,0.112l2.586,1.07l-1.07,2.582 c0.246,0.345,0.511,0.675,0.8,0.978c0.051,0.054,0.099,0.11,0.153,0.163c0.037,0.038,0.079,0.073,0.118,0.11 c0.311,0.303,0.654,0.577,1.014,0.835l2.581-1.069l1.07,2.586c0.038,0.008,0.079,0.015,0.118,0.024 c0.009-0.001,0.021,0.001,0.03,0.002c0.915,0.141,1.858,0.136,2.798-0.02l1.073-2.59l2.584,1.07c0.034-0.02,0.067-0.043,0.098-0.067 c0.01-0.006,0.019-0.014,0.03-0.023c0.743-0.546,1.406-1.215,1.958-1.987l-1.073-2.592l2.586-1.07 c0.006-0.037,0.015-0.076,0.022-0.116c0.001-0.012,0.001-0.024,0.003-0.036C17.747,9.263,17.743,8.322,17.587,7.385z M15.494,9.338 l-2.726,1.129l0.004,0.01l-0.009,0.003l1.13,2.725c-0.21,0.245-0.44,0.473-0.686,0.686l-2.726-1.128l-0.003,0.009l-0.009-0.005 L9.34,15.493c-0.322,0.024-0.644,0.023-0.97,0.001l-1.13-2.726l-0.008,0.003l-0.005-0.01l-2.734,1.133 c-0.028-0.024-0.06-0.045-0.088-0.072c-0.09-0.08-0.176-0.171-0.261-0.258c-0.086-0.086-0.176-0.169-0.258-0.26 c-0.024-0.026-0.046-0.059-0.07-0.088l1.131-2.734l-0.009-0.005l0.005-0.008L2.216,9.34C2.194,9.014,2.192,8.691,2.218,8.37 l2.723-1.128L4.938,7.234l0.008-0.003L3.815,4.502c0.214-0.246,0.442-0.476,0.686-0.686l2.726,1.128L7.23,4.937L7.238,4.94 l1.13-2.726c0.325-0.023,0.648-0.023,0.97,0.001l1.128,2.726l0.012,0.005l2.726-1.129c0.118,0.104,0.232,0.215,0.346,0.327 c0.115,0.117,0.23,0.234,0.337,0.359l-1.128,2.725l0.009,0.003l-0.004,0.01l2.725,1.128C15.517,8.69,15.518,9.014,15.494,9.338z M11.143,7.909l-0.004-0.008l0.66-1.59c-0.121-0.143-0.256-0.275-0.4-0.402L9.808,6.568L9.806,6.564L9.801,6.566L9.142,4.975 c-0.188-0.015-0.376-0.015-0.566,0l-0.659,1.59H7.912L7.91,6.567L6.318,5.91C6.176,6.031,6.044,6.165,5.916,6.307L6.576,7.9 L6.571,7.902l0.002,0.006L4.976,8.57C4.975,8.59,4.971,8.614,4.97,8.635c-0.003,0.07-0.001,0.143-0.001,0.214 c0,0.07-0.003,0.143,0.003,0.214c0,0.022,0.001,0.044,0.005,0.067l1.597,0.661v0.007L6.577,9.8l-0.658,1.592 c0.121,0.142,0.257,0.274,0.401,0.397l1.59-0.659l0.001,0.006l0.006-0.002l0.659,1.592c0.191,0.015,0.38,0.015,0.567,0l0.659-1.592 l0.005,0.002L9.81,11.13l1.59,0.657c0.143-0.123,0.276-0.256,0.4-0.398l-0.659-1.59l0.005-0.003L11.144,9.79l1.59-0.659 c0.006-0.096,0.008-0.194,0.009-0.287c0-0.093-0.001-0.187-0.008-0.278L11.143,7.909z M8.855,9.927c-0.593,0-1.074-0.48-1.074-1.074 c0-0.593,0.48-1.074,1.074-1.074c0.593,0,1.074,0.48,1.074,1.074C9.929,9.446,9.448,9.927,8.855,9.927z"/>
                        </svg>
                      </div>
                      <div class="facet face">
                        <svg viewBox="0 0 17.708 17.708">
                          <title>Performance and Integration</title>
                          <path fill="#999999" d="M17.587,7.385l-2.59-1.074l1.067-2.575c-0.272-0.381-0.567-0.741-0.891-1.069 c-0.019-0.021-0.039-0.042-0.059-0.063c-0.033-0.033-0.069-0.065-0.105-0.098c-0.317-0.311-0.666-0.593-1.033-0.858l-2.575,1.065 l-1.074-2.59C9.393-0.035,8.451-0.039,7.54,0.1C7.524,0.102,7.509,0.103,7.496,0.105C7.456,0.11,7.418,0.119,7.383,0.127 L6.309,2.711l-2.59-1.072C2.945,2.191,2.273,2.855,1.724,3.605C1.719,3.612,1.713,3.62,1.707,3.628 C1.684,3.659,1.662,3.692,1.641,3.725l1.07,2.583l-2.59,1.075c-0.155,0.933-0.16,1.872-0.023,2.782 c0.002,0.016,0.003,0.034,0.006,0.049c0.005,0.038,0.012,0.075,0.019,0.112l2.586,1.07l-1.07,2.582 c0.246,0.345,0.511,0.675,0.8,0.978c0.051,0.054,0.099,0.11,0.153,0.163c0.037,0.038,0.079,0.073,0.118,0.11 c0.311,0.303,0.654,0.577,1.014,0.835l2.581-1.069l1.07,2.586c0.038,0.008,0.079,0.015,0.118,0.024 c0.009-0.001,0.021,0.001,0.03,0.002c0.915,0.141,1.858,0.136,2.798-0.02l1.073-2.59l2.584,1.07c0.034-0.02,0.067-0.043,0.098-0.067 c0.01-0.006,0.019-0.014,0.03-0.023c0.743-0.546,1.406-1.215,1.958-1.987l-1.073-2.592l2.586-1.07 c0.006-0.037,0.015-0.076,0.022-0.116c0.001-0.012,0.001-0.024,0.003-0.036C17.747,9.263,17.743,8.322,17.587,7.385z M15.494,9.338 l-2.726,1.129l0.004,0.01l-0.009,0.003l1.13,2.725c-0.21,0.245-0.44,0.473-0.686,0.686l-2.726-1.128l-0.003,0.009l-0.009-0.005 L9.34,15.493c-0.322,0.024-0.644,0.023-0.97,0.001l-1.13-2.726l-0.008,0.003l-0.005-0.01l-2.734,1.133 c-0.028-0.024-0.06-0.045-0.088-0.072c-0.09-0.08-0.176-0.171-0.261-0.258c-0.086-0.086-0.176-0.169-0.258-0.26 c-0.024-0.026-0.046-0.059-0.07-0.088l1.131-2.734l-0.009-0.005l0.005-0.008L2.216,9.34C2.194,9.014,2.192,8.691,2.218,8.37 l2.723-1.128L4.938,7.234l0.008-0.003L3.815,4.502c0.214-0.246,0.442-0.476,0.686-0.686l2.726,1.128L7.23,4.937L7.238,4.94 l1.13-2.726c0.325-0.023,0.648-0.023,0.97,0.001l1.128,2.726l0.012,0.005l2.726-1.129c0.118,0.104,0.232,0.215,0.346,0.327 c0.115,0.117,0.23,0.234,0.337,0.359l-1.128,2.725l0.009,0.003l-0.004,0.01l2.725,1.128C15.517,8.69,15.518,9.014,15.494,9.338z M11.143,7.909l-0.004-0.008l0.66-1.59c-0.121-0.143-0.256-0.275-0.4-0.402L9.808,6.568L9.806,6.564L9.801,6.566L9.142,4.975 c-0.188-0.015-0.376-0.015-0.566,0l-0.659,1.59H7.912L7.91,6.567L6.318,5.91C6.176,6.031,6.044,6.165,5.916,6.307L6.576,7.9 L6.571,7.902l0.002,0.006L4.976,8.57C4.975,8.59,4.971,8.614,4.97,8.635c-0.003,0.07-0.001,0.143-0.001,0.214 c0,0.07-0.003,0.143,0.003,0.214c0,0.022,0.001,0.044,0.005,0.067l1.597,0.661v0.007L6.577,9.8l-0.658,1.592 c0.121,0.142,0.257,0.274,0.401,0.397l1.59-0.659l0.001,0.006l0.006-0.002l0.659,1.592c0.191,0.015,0.38,0.015,0.567,0l0.659-1.592 l0.005,0.002L9.81,11.13l1.59,0.657c0.143-0.123,0.276-0.256,0.4-0.398l-0.659-1.59l0.005-0.003L11.144,9.79l1.59-0.659 c0.006-0.096,0.008-0.194,0.009-0.287c0-0.093-0.001-0.187-0.008-0.278L11.143,7.909z M8.855,9.927c-0.593,0-1.074-0.48-1.074-1.074 c0-0.593,0.48-1.074,1.074-1.074c0.593,0,1.074,0.48,1.074,1.074C9.929,9.446,9.448,9.927,8.855,9.927z"/>
                        </svg>
                      </div>
                    </div>
                    <div class="feature semantics">
                      <div class="facet top">
                        <div class="pop-up">
                          <div class="title">Semantic Mark-Up</div>
                          <div class="arrow"></div>
                        </div>
                        <svg viewBox="0 0 17.72 17.708">
                          <title>Semantic Mark-Up</title>
                          <polygon fill="#999999" points="8.862,0 0,4.479 0,7.424 8.862,2.945 17.72,7.424 17.72,4.479 "/>
                          <polygon fill="#999999" points="8.862,5.141 0,9.62 0,12.565 8.862,8.086 17.72,12.565 17.72,9.62 "/>
                          <polygon fill="#999999" points="8.862,10.283 0,14.762 0,17.708 8.862,13.229 17.72,17.708 17.72,14.762 "/>
                        </svg>
                      </div>
                      <div class="facet face">
                        <svg viewBox="0 0 17.72 17.708">
                          <title>Semantic Mark-Up</title>
                          <polygon fill="#999999" points="8.862,0 0,4.479 0,7.424 8.862,2.945 17.72,7.424 17.72,4.479 "/>
                          <polygon fill="#999999" points="8.862,5.141 0,9.62 0,12.565 8.862,8.086 17.72,12.565 17.72,9.62 "/>
                          <polygon fill="#999999" points="8.862,10.283 0,14.762 0,17.708 8.862,13.229 17.72,17.708 17.72,14.762 "/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </viewModel>
        </div>
      </viewModel>
    </router>

    @yield('javascript')

    <script>
      window.docNavData = {!! $docNavData !!};
      window.releaseList = {!! $releaseList !!};
    </script>

    <script src="/bower_components/ace/src-min-noconflict/ace.js" type="text/javascript" charset="utf-8"></script>
    @if (App::isLocal() && !Input::has('compiled'))
      <script src="/scripts/require-config.js"></script>
    	<script src="/bower_components/requirejs/require.js" data-main="/scripts/app/main"></script>
    @else
      <script src="/scripts/main-build.js?v={{ $buildVersion }}"></script>
    @endif
    <![endif]-->
  </body>
</html>
