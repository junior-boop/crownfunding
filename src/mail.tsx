import type { FC } from 'hono/jsx'

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);