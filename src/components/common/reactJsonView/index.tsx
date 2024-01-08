"use client";

import dynammic from "next/dynamic";

import { cn } from "@/lib/utils";

const ReactJsonView = dynammic(() => import("react-json-view"), {
    ssr: false,
});

const Component = ({ src, className, enabled, expanded }: Props) => {
    return (
        <>
            {enabled && (
                <div className={cn(className)}>
                    <ReactJsonView collapsed={!expanded} src={src} />
                </div>
            )}
        </>
    );
};

type Props = {
    enabled?: boolean;
    src: any;
    className?: string;
    expanded?: boolean;
};

export default Component;
