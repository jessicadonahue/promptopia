import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const {userId, prompt, tag} = await req.json(); // extract data through post request

    try {
        // we have to connect to db everytime, its a lambda function so it will die every time it does its job
        await connectToDB();
        const newPrompt = new Prompt({ // create new Prompt record 
            creator: userId,
            prompt,
            tag,
        });
        await newPrompt.save(); // save Prompt record to db
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response('Failed to create new prompt', { status: 500 })
    }
}