import React, {ReactNode, useRef} from 'react';

interface formProps{
    onSubmit():void,
    children: ReactNode
}

export default React.forwardRef(function Form(props:formProps, $form: any) {
    //let $form = useRef<HTMLFormElement>(null);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        let verror = false;
        // console.log($form);
        let el: HTMLInputElement | undefined;
        $form && Array.from($form.current!.elements).forEach((item:any) => {
            /*if (typeof item.getAttribute("require") === "string" && !item.value) {
                item.classList.add("empty");
                hasEmpty = true;
            }*/
            if (item.getAttribute("verror") || item.dataset.verror) {
                item.classList.add("error");
                verror = true;
                if (!el) {
                    el = item;
                }
            }
        });
        if (!verror) {
            props.onSubmit();
        } else {
            el?.scrollIntoView({block:"center"});
        }
        event.preventDefault();
    }

    return (
        <form ref={$form} autoComplete={"off"} onSubmit={handleSubmit}>
            {props.children}
        </form>
    )
})
