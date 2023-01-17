
export interface DragCustomBehavior
{
    onMouseDown_Callback?:   (event: MouseEvent) => any,
    onTouchStart_Callback?:  (event: TouchEvent) => any,

    onMouseUp_Callback?:     (event: MouseEvent) => any,
    onTouchEnd_Callback?:    (event: TouchEvent) => any
}