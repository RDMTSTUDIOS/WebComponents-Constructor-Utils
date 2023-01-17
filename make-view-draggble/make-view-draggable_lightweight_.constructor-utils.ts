export default function MakeViewDraggable_LIGHTWEIGHT(view: HTMLElement)
{
    //===-----------MOUSE Version-------===//
    view.onmousedown = mouse_down;
    
    function mouse_down(down_e: MouseEvent)
    {
        down_e.preventDefault();
        const dx = view.offsetLeft - down_e.clientX;
        const dy = view.offsetTop  - down_e.clientY;

        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', mouse_up);

        function move(e: MouseEvent)
        {
            view.style.left = e.clientX + dx + 'px';
            view.style.top  = e.clientY + dy + 'px';
        };

        function mouse_up()
        {
            document.removeEventListener('mouseup', mouse_up);
            document.removeEventListener('mousemove', move);
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

        function swipe(e: TouchEvent)
        {
            view.style.left = e.touches[0].clientX + dx + 'px';
            view.style.top  = e.touches[0].clientY + dy + 'px';
        };

        function touch_end()
        {
            document.removeEventListener('touchend', touch_end);
            document.removeEventListener('touchmove', swipe);
        };
    }
    //===------- ------------------ -------===//
}
