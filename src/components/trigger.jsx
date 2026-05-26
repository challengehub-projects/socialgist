import React from "react";

export default function button() {
    return (
        <>
            <Button onClick={() => setOpen(true)}>
                Create Post
            </Button>

            <CreatePostModal
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    )
}