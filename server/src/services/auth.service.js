import { User } from '../models/user.model.js';

export const authCallback = async (params) => {
    const { id, firstName, lastName, imageUrl } = params;

    const user = await User.findOne({
        clerkId: id
    });

    if(!user) {
        await User.create({
            clerkId: id,
            fullName: `${firstName || ""} ${lastName || ""}`.trim(),
            imageUrl
        });
    }
}
