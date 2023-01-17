import { DragCustomBehavior } from "./drag-custom-behavior.type";

export default function MakeViewDraggable(view: HTMLElement, customBehavior?: DragCustomBehavior): void
{
    if (customBehavior)
    {
        for (let key in customBehavior)
        {
            Object.defineProperty(view, `drag_${key}`, {
                //@ts-ignore
                value: customBehavior[key],
            });
        };
    };
    
    //===-----------MOUSE Version-------===//
    view.onmousedown = mouse_down;
    
    function mouse_down(down_e: MouseEvent)
    {
        down_e.preventDefault();

        const dx = view.offsetLeft - down_e.clientX;
        const dy = view.offsetTop  - down_e.clientY;

        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', mouse_up);
        //@ts-ignore
        if (view['drag_onMouseDown_Callback']) view['drag_onMouseDown_Callback'](down_e);

        function move(e: MouseEvent)
        {
            view.style.left = e.clientX + dx + 'px';
            view.style.top  = e.clientY + dy + 'px';
        };

        function mouse_up(e: MouseEvent)
        {
            document.removeEventListener('mouseup', mouse_up);
            document.removeEventListener('mousemove', move);
            //@ts-ignore
            if(view['drag_onMouseUp_Callback']) view['drag_onMouseUp_Callback'](e);
        };
    };
    //===----------- ----------- -------===//

    //===-------TOUCH-SCREEN Version-------===//
    view.ontouchstart = touch_start;

    function touch_start(touch_e: TouchEvent)
    {
        touch_e.preventDefault();

        const dx = view.offsetLeft - touch_e.touches[0].clientX;
        const dy = view.offsetTop  - touch_e.touches[0].clientY;

        document.addEventListener('touchmove', swipe);
        document.addEventListener('touchend', touch_end);
        //@ts-ignore
        if(view['drag_onTouchStart_Callback']) view['drag_onTouchStart_Callback'](touch_e);
        function swipe(e: TouchEvent)
        {
            view.style.left = e.touches[0].clientX + dx + 'px';
            view.style.top  = e.touches[0].clientY + dy + 'px';
        };

        function touch_end(e: TouchEvent)
        {
            document.removeEventListener('touchend', touch_end);
            document.removeEventListener('touchmove', swipe);
            //@ts-ignore
            if(view['drag_onTouchEnd_Callback']) view['drag_onTouchEnd_Callback'](e);
        };
    }
    //===------- ------------------ -------===//
}