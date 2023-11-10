export function fileDownload(res, fileName) {
  if (window.navigator.msSaveBlob) {
    //判断了有该方法即为IE浏览器
    try {
      let blob = new Blob([res], { type: "application/x-www-form-urlencoded" });
      window.navigator.msSaveBlob(blob, fileName);
    } catch (e) {
      console.log(e);
    }
  } else {
    let link = document.createElement("a");
    link.href = window.URL.createObjectURL(new Blob([res]));
    link.target = "_blank";
    link.download = fileName;
    document.body.appendChild(link); // Firefox 中必须这么写，不然不会起效果
    link.click();
    document.body.removeChild(link);
  }
}
