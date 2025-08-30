import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={props.width || "32"}
      height={props.height || "32"}
      {...props}
    >
      <g fill="hsl(var(--primary))">
        <path d="M48,32H208a16,16,0,0,1,16,16V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32Z" opacity="0.2" />
        <path d="M208,24H48A24,24,0,0,0,24,48V208a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V48A24,24,0,0,0,208,24Zm8,184a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8Z" />
        <path d="M140,84H88a8,8,0,0,0,0,16h52a8,8,0,0,0,0-16Z" />
        <path d="M168,124H88a8,8,0,0,0,0,16h80a8,8,0,0,0,0-16Z" />
        <path d="M168,164H88a8,8,0,0,0,0,16h80a8,8,0,0,0,0-16Z" />
      </g>
    </svg>
  );
}
