function modifyElements(args) {
    function setProperty(element) {
      try {
        element.style.setProperty(args.style, args.value, 'important');
      } catch (error) {
        element.setAttribute('style', element.style.cssText + args.style + ':' + args.value + '!important;');
      }
    }

    function isElement(o) {
      return o instanceof HTMLElement && o !== null && o.nodeType === 1;
    }

    console.log("### Elements ###")
    console.log(args.elements)
    console.log(args.style)
    console.log(args.value)

    if (args.elements.constructor === Array) {
      for (var i = 0; i < args.elements.length; ++i) {
        if (!isElement(args.elements[i])) {
          for (var j = 0; j < args.elements[i].length; ++j) {
            setProperty(args.elements[i][j]);
          }
        } else {
          setProperty(args.elements[i]);
        }
      }
    } else if (isElement(args.elements)) {
      setProperty(args.elements);
    }


  }

class CommonUtils {
    page;

    constructor(page) {
        this.page = page;
    }

    async hideElement(elements: any) {
        await this.page.evaluate(modifyElements, {elements: elements, style: 'opacity', value: '0'});
    }

    async removeElement(elements: any) {
        await this.page.evaluate(modifyElements, {elements: elements, style: 'display', value: 'none'});
    }
}

export { CommonUtils }
