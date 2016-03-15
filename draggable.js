var globalMouseMove;

const makeElementDraggable = (draggableElement) => {

    globalMouseMove = globalMouseMove || Rx.Observable.fromEvent(document, 'mousemove');

    const mouseDown = Rx.Observable.fromEvent(draggableElement, 'mousedown'),
        mouseUp = Rx.Observable.fromEvent(draggableElement, 'mouseup');

    mouseDown.forEach(_ => draggableElement.className += ' dragging');

    mouseUp.forEach(_ => draggableElement.className = draggableElement.className.replace(/ dragging/g, () => ''));

    const mouseDrag = mouseDown.selectMany(downEvent => {
        return globalMouseMove
            .map(event => ({left: event.clientX - downEvent.offsetX, top: event.clientY - downEvent.offsetY}))
            .takeUntil(mouseUp);
    });

    mouseDrag.subscribe(newLocation => {
        draggableElement.style.left = newLocation.left + 'px';

        draggableElement.style.top = newLocation.top + 'px';
    });
};

[].slice.call(document.querySelectorAll('.draggable')).forEach(makeElementDraggable);