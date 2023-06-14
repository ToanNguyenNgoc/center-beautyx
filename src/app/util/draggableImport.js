import {Draggable,Swappable} from "@shopify/draggable";
// export const Sort = Sortable;
function dragCustom(){
    var containers = document.querySelectorAll(".draggable-zone");
    if (containers.length === 0) {
        return false;
    }
    
    const draggable = new Swappable(containers, {
        draggable:".draggable",
        handle: ".draggable .draggable-handle",
        mirror: {
            //appendTo: selector,
            appendTo: "body",
            constrainDimensions: true
        }
      });
      
      draggable.on('drag:start', () => console.log('drag:start'));
      draggable.on('drag:move', () => console.log('drag:move'));
      draggable.on('drag:stop', () => console.log('drag:stop'));
}
export default dragCustom;