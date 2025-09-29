"use server";

import { prisma } from "../../../../utils/db";

type ContactFormData = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

export const handleContactSubmit = async (data: ContactFormData) => {
    const { name, email, phone, message } = data;

    try {
        const newContact = await prisma.contact.create({
            data: {
                name: name as string,
                email: email as string,
                phone: phone as string,
                query: message as string,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
};
