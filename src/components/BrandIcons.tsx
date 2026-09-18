import React from 'react';
import { Github } from 'lucide-react';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  className?: string;
  size?: number | string;
  colored?: boolean;
}

/**
 * Official WhatsApp vector logo
 */
export function WhatsAppIcon({ className = 'w-4 h-4', colored = false, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={colored ? '#25D366' : 'currentColor'}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M17.472 14.382c-.301-.15-1.781-.879-2.057-.98-.276-.1-.477-.15-.678.15-.2.3-.778.98-.954 1.18-.175.2-.351.226-.652.075-.3-.15-1.267-.467-2.414-1.49-.893-.797-1.496-1.781-1.672-2.082-.175-.3-.019-.462.132-.612.135-.135.301-.351.452-.527.15-.175.2-.3.301-.502.1-.2.05-.376-.025-.526-.075-.15-.678-1.631-.93-2.235-.245-.589-.494-.509-.678-.518-.176-.008-.377-.01-.578-.01-.2 0-.527.075-.803.376s-1.055 1.03-1.055 2.51 1.08 2.912 1.231 3.113c.15.2 2.126 3.246 5.15 4.553.72.311 1.282.497 1.72.636.723.23 1.381.197 1.901.12.579-.087 1.781-.728 2.032-1.431.251-.703.251-1.305.176-1.43-.076-.126-.277-.201-.578-.352zm-5.467 7.423a9.78 9.78 0 0 1-4.99-1.365l-.358-.213-3.71.973.99-3.616-.233-.371a9.79 9.79 0 0 1-1.503-5.213c0-5.412 4.403-9.815 9.817-9.815a9.77 9.77 0 0 1 6.942 2.875 9.78 9.78 0 0 1 2.871 6.94c0 5.413-4.404 9.816-9.826 9.816zm7.632-17.45A11.72 11.72 0 0 0 12.005.195C5.39.195 0 5.586 0 12.203c0 2.112.551 4.175 1.597 6.002L0 24l5.96-1.564a11.8 11.8 0 0 0 5.688 1.448h.005c6.614 0 12.004-5.39 12.004-12.207a11.75 11.75 0 0 0-3.62-8.324z" />
    </svg>
  );
}

/**
 * Official Gmail vector logo (modern Google "M" envelope)
 */
export function GmailIcon({ className = 'w-4 h-4', colored = false, ...props }: IconProps) {
  if (colored) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...props}
      >
        <path
          fill="#4285F4"
          d="M5.5 19.5h-3a1.5 1.5 0 0 1-1.5-1.5V7.5L5.5 11v8.5z"
        />
        <path
          fill="#34A853"
          d="M18.5 19.5h3a1.5 1.5 0 0 0 1.5-1.5V7.5L18.5 11v8.5z"
        />
        <path
          fill="#EA4335"
          d="M18.5 11V6a1.5 1.5 0 0 0-2.4-1.2L12 8.5 7.9 4.8A1.5 1.5 0 0 0 5.5 6v5l6.5 5 6.5-5z"
        />
        <path
          fill="#FBBC05"
          d="M5.5 6v5l6.5 5V8.5L7.9 4.8c-.3-.3-.7-.4-1.1-.3-.7.1-1.3.7-1.3 1.5z"
        />
        <path
          fill="#C5221F"
          d="M12 13.5l6.5-5V6l-6.5 5-6.5-5v2.5l6.5 5z"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  );
}

/**
 * Official GitHub vector icon from lucide-react
 */
export function GitHubIcon({ className = 'w-4 h-4', ...props }: IconProps) {
  return <Github className={className} {...(props as any)} />;
}

/**
 * Official LinkedIn vector icon
 */
export function LinkedInIcon({ className = 'w-4 h-4', colored = false, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={colored ? '#0A66C2' : 'currentColor'}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}
