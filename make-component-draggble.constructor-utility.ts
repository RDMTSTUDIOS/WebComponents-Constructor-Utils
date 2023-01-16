export default function MakeViewDragbble(view: HTMLElement)
{
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
            view.style.top = e.clientY + dy + 'px';
        };

        function mouse_up()
        {
            document.removeEventListener('mouseup', mouse_up);
            document.removeEventListener('mousemove', move);
        };
    };
}