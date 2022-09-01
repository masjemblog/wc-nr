function isUrl(data) {
  try {
    new URL(data);
    return true;
  } catch (e) {
    return false;
  }
}

function urlParse(data) {
  var m = data.match(
      /^(([^:\/?#]+:)?(?:\/\/((?:([^\/?#:]*):([^\/?#:]*)@)?([^\/?#:]*)(?::([^\/?#:]*))?)))?([^?#]*)(\?[^#]*)?(#.*)?$/
    ),
    r = {
      hash: m[10] || "",
      host: m[3] || "",
      hostname: m[6] || "",
      href: m[0] || "",
      origin: m[1] || "",
      pathname: m[8] || (m[1] ? "/" : ""),
      port: m[7] || "",
      protocol: m[2] || "",
      search: m[9] || "",
      username: m[4] || "",
      password: m[5] || "",
    };
  if (r.protocol.length == 2) {
    r.protocol = "file:///" + r.protocol.toUpperCase();
    r.origin = r.protocol + "//" + r.host;
  }
  r.href = r.origin + r.pathname + r.search + r.hash;
  return r;
}

function maketextnumber(n) {
  for (
    var r = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
      ],
      e = n,
      t = new Array(),
      a = 0;
    a <= e - 1;
    a++
  ) {
    t[a] = r[parseInt(Math.random() * r.length)];
    t = t;
  }
  return t.join("");
}

function removeImg(data) {
  let targetImg = document.querySelector(`[pick-image="` + data + `"]`);
  if (targetImg != null) {
    targetImg.remove();
  }
}
document.querySelectorAll("img").forEach(function (a) {
  try {
    let dataUrl = a.getAttribute("src");
    let uriOrigin = window.location.origin;
    if (dataUrl != null && dataUrl.indexOf("//") == 0) {
      dataUrl = dataUrl.replace("//", "https://");
    }
    if (isUrl(dataUrl)) {
    } else {
      if (window.location.href.indexOf("/host-") > 0) {
        let urlReal = window.location.href.split("/host-")[1];
        urlReal = urlReal
          .replace("https-", "https://")
          .replace("http-", "http://");
        urlReal = urlParse(urlReal).origin + dataUrl;
        urlReal =
          uriOrigin +
          urlReal
            .replace("https://", "/host-https-")
            .replace("http://", "/host-http-");
        a.setAttribute("src", urlReal);
      }
    }
  } catch (e) {}
});

let elImg = document.querySelectorAll("img");
elImg.forEach(function (a) {
  // a.setAttribute("loading", "lazy");
  // a.setAttribute("style", "max-width:100%");

  let dataFallback = a.getAttribute("data-fallback");
  if ((dataFallback == null) == false) {
    let params = window.location.href.split("/host-")[1];
    if (dataFallback.indexOf("//") == 0) {
      params = params.split("-")[0];
      dataFallback = dataFallback.replace("//", "-");
      dataFallback = window.location.origin + "/host-" + params + dataFallback;
    } else {
      if (isUrl(dataFallback)) {
        dataFallback = dataFallback.replace("://", "-");
        dataFallback = window.location.origin + "/host-" + dataFallback;
      } else {
        if (dataFallback.indexOf("/") == 0) {
          params = params.split("/")[0];
          if (params != null) {
            dataFallback =
              window.location.origin + "/host-" + params + dataFallback;
          }
        } else {
          params = params.split("/")[0];
          if (params != null) {
            dataFallback =
              window.location.origin + "/host-" + params + "/" + dataFallback;
          }
        }
      }
    }
    a.setAttribute("src", dataFallback);
  }

  let dataLazySrc = a.getAttribute("data-lazy-src");
  if ((dataLazySrc == null) == false) {
    if (isUrl(dataLazySrc) || dataLazySrc.indexOf("//") == 0) {
    } else {
      if (dataLazySrc.indexOf("/") == 0) {
        dataLazySrc = window.location.href + dataLazySrc;
      } else {
        dataLazySrc = window.location.href + "/" + dataLazySrc;
      }
    }
    a.setAttribute("src", dataLazySrc);
  }

  let srcset = a.getAttribute("data-lazy-srcset");
  if ((srcset == null) == false) {
    srcset = srcset.split(" ")[0];
    srcset = srcset.replace("://", "-");
    srcset = window.location.origin + "/host-" + srcset;
    a.setAttribute("src", srcset);
  }

  let urlSrcImg = a.getAttribute("src");
  if (urlSrcImg && urlSrcImg.indexOf(location.hostname) < 0) {
    let classImg = a.getAttribute("class");
    let getSrcSet = a.getAttribute("srcset");
    if ((classImg == null) == false) {
      a.classList.remove("lazyload");
    }
    if ((getSrcSet == null) == false) {
      getSrcSet = getSrcSet.split(",")[0];
      a.setAttribute("src", getSrcSet);
    }
  }

  try {
    let c = a.getAttribute("class");
    if (c.indexOf("lozad") == 0 || c.indexOf("lozad") > 0) {
      a.setAttribute("class", c.replace("lozad", ""));
    }
    if (c.indexOf("lazyload") == 0 || c.indexOf("lazyload") > 0) {
      a.setAttribute("class", c.replace("lazyload", ""));
    }
    if (c.indexOf("fade") == 0 || c.indexOf("fade") > 0) {
      a.setAttribute("class", c.replace("fade", ""));
    }
  } catch (e) {
    //
  }
});

let dataLazy = document.querySelectorAll(".lazy-image.lazy-image-udf");
dataLazy.forEach(function (a) {
  let dataHref = a.getAttribute("data-src");
  if (dataHref) {
    let targetLazy = a.querySelector(".loadingPlaceholder");
    let targetDiv = a.querySelector(".lazy-image__loadingPlaceholder");
    if (targetLazy) {
      targetLazy.setAttribute("src", dataHref);
      targetDiv.setAttribute("class", "show");
    }
  }
});

(function () {
  var link;
  var Href = [
    "//pl17086594.profitablecpmgate.com/b0/e0/f7/b0e0f7aef3540e5e4e5fbe40b4d9e002.js",
    "//www.topdisplayformat.com/e7f50bcdcf74f867d71b65a5ade97f99/invoke.js",
    "//s10.histats.com/js15_as.js",
  ];
  Href.forEach((e) => {
    link = document.createElement("link");
    link.href = e;
    link.rel = "preload";
    link.as = "script";
    document.head.append(link);
  });
})();

// CTA Button
// (function () {
//   const p = document.createElement("div");
//   p.setAttribute(
//     "style",
//     "text-align: center; background-color: #ffc107; padding: 0.25rem !important; box-sizing: border-box; outline: none !important;"
//   );
//   p.innerHTML =
//     "<strong>[HOT]</strong> <a style='text-decoration: none; color: blue;' href='https://www.google.com/' target='_blank'>Watch Movies & TV Shows Online Free</a>";
//   document.body.insertBefore(p, document.body.firstChild);
// })();

(function () {
  var script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute(
    "src",
    "//pl17383636.profitablecpmgate.com/18/a4/38/18a438b4c9c384a6f2d2033dccccef7b.js"
  );
  document.body.append(script);
})();

(function () {
  // var bc = document.createElement("center");
  // var backlink = `<p><span>Partner Links: </span>
  // <a style="text-decoration: none;" href="https://xagc.eu.org/" target="_blank">XAGC</a>
  // </p>`;
  // bc.innerHTML = backlink;
  // document.getElementsByTagName("body")[0].append(bc);

  var div = document.createElement("div");
  div.setAttribute("id", "fixedban");
  div.setAttribute(
    "style",
    "width:100%;margin:auto;text-align:center;float:none;overflow:hidden;display:scroll;position:fixed;bottom:0;z-index:999;-webkit-transform:translateZ(0);"
  );

  var divA = document.createElement("div");
  var a = document.createElement("a");
  a.setAttribute("id", "close-fixedban");
  a.setAttribute(
    "onclick",
    'document.getElementById("fixedban").style.display = "none";'
  );
  a.setAttribute("style", "cursor:pointer;");

  var img = document.createElement("img");
  img.setAttribute("alt", "close");
  img.setAttribute("src", "https://yess-online.com/close.png");
  img.setAttribute("title", "close button");
  img.setAttribute("style", "vertical-align:middle;");

  var divS = document.createElement("div");
  divS.setAttribute(
    "style",
    "text-align:center;display:block;max-width:300px;height:auto;overflow:hidden;margin:auto"
  );

  var scr = document.createElement("script");
  scr.setAttribute("type", "text/javascript");
  scr.innerHTML = `atOptions = {
    'key' : 'e7f50bcdcf74f867d71b65a5ade97f99',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };`;
  var scrr = document.createElement("script");
  scrr.setAttribute("type", "text/javascript");
  scrr.setAttribute(
    "src",
    "//www.topdisplayformat.com/e7f50bcdcf74f867d71b65a5ade97f99/invoke.js"
  );

  var pop = document.createElement("script");
  pop.setAttribute("type", "text/javascript");
  pop.setAttribute(
    "src",
    "//pl17086594.profitablecpmgate.com/b0/e0/f7/b0e0f7aef3540e5e4e5fbe40b4d9e002.js"
  );

  divS.append(scr);
  divS.append(scrr);
  a.append(img);
  divA.append(a);
  div.append(divA);
  div.append(divS);

  var hs = document.createElement("script");
  hs.setAttribute("type", "text/javascript");
  hs.innerHTML = `var _Hasync= _Hasync|| [];
  _Hasync.push(['Histats.start', '1,4664970,4,0,0,0,00010000']);
  _Hasync.push(['Histats.fasi', '1']);
  _Hasync.push(['Histats.track_hits', '']);
  (function() {
  var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
  hs.src = ('//s10.histats.com/js15_as.js');
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
  })();`;

  document.body.append(div);
  document.body.append(pop);
  document.body.append(hs);
})();
