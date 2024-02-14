'use client'


import { SignInButton, SignOutButton, useSession } from "@clerk/nextjs";
import { useMutation , useQuery} from "convex/react";
import {api} from "../../convex/_generated/api"

export default function Home() {
    const { isSignedIn } = useSession();
    const createThumbnail = useMutation(api.thumbnail.createThumbnail)
    const thumbnails = useQuery(api.thumbnail.getThumbnailsForUser)
    return (
        <main className="">
            { isSignedIn ? <SignOutButton /> : <SignInButton />}
            {isSignedIn && (
                <form 
                    onSubmit={ async(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const title = formData.get('title');
                        const form = e.target as HTMLFormElement;
                        //TODO: pass our mutation
                        await createThumbnail({
                            title,
                        });
                        form.reset();
                    }}>
                    <label> Title </label>
                    <input name="title" className="text-black"></input>
                    <button>Create</button>
                </form>
            )}
            {thumbnails?.map(thumbnail => {
                return <div key={thumbnail._id}>
                    {thumbnail.title}
                </div>
            } )}
            {thumbnails?.map(thumbnail => {
                return <div key={thumbnail._id}>
                    {thumbnail.title}
                </div>
            } )}
        </main>
    );
}