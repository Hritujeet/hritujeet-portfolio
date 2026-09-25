import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Resume',
    description: 'Professional resume of Hritujeet Sharma, showcasing skills, experience, and educational background in software engineering.',
};

export default function ResumeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
