"use client";

import { SignInButton, SignOutButton, useSession } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const createImage = useMutation(api.images.createImage);
  const images = useQuery(api.images.getImagesForUser);

  const { isSignedIn } = useSession();

  return (
    <main className="">
      {isSignedIn ? <SignOutButton /> : <SignInButton />}
      {isSignedIn && (
        <form
          onSubmit={async (e) => {
            const form = e.target as HTMLFormElement;
            e.preventDefault();
            const formData = new FormData(form);
            const title = formData.get("title") as string;
            await createImage({ title });
            form.reset();
          }}
        >
          <label>Title</label>
          <input type="text" name="title" className="text-black"></input>
          <button>Create</button>
        </form>
      )}
      {images?.map((image) => {
        return (
          <div key={image._id}>
            <h1>{image.title}</h1>
          </div>
        );
      })}
    </main>
  );
}
