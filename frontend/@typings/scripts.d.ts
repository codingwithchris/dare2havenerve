declare module 'react' {
    interface DetailedHTMLProps<T> extends <ScriptHTMLAttributes<HTMLScriptElement<T>> {
        // extends React's HTMLAttributes
        paypalExpress?: string;
    }
}

DetailedHTMLProps<ScriptHTMLAttributes<HTMLScriptElement>