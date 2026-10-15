export const isAdminEmail = (
    email: string | null | undefined,
    configuredAdminEmail?: string
) => {
    const normalizedEmail = email?.toLowerCase();
    const normalizedAdminEmail = configuredAdminEmail?.toLowerCase();

    return Boolean(
        normalizedEmail &&
            normalizedAdminEmail &&
            normalizedEmail === normalizedAdminEmail
    );
};
