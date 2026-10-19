"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { CLIENTS, type Client } from "@/lib/clients";

function Logo({ client }: { client: Client }) {
  const img = (
    <Image
      src={`/clients/${client.logo}`}
      alt={`${client.name} logo`}
      width={220}
      height={80}
      sizes="220px"
      style={client.scale ? { transform: `scale(${client.scale})` } : undefined}
      /* Logos arrive in mixed colours; normalise to the dark UI, restore on hover. */
      className={`max-h-10 w-auto max-w-[9rem] object-contain opacity-55 brightness-0 invert transition-[opacity,filter] duration-500 group-hover:opacity-100 sm:max-h-12 sm:max-w-[11rem] ${
        client.mono ? "" : "group-hover:brightness-100 group-hover:invert-0"
      }`}
    />
  );

  return (
    <li className="group flex w-[42%] items-center justify-center sm:w-[28%] lg:w-[17%]">
      {client.slug ? (
        <Link
          href={`/work/${client.slug}`}
          aria-label={`${client.name} case study`}
          className="flex items-center justify-center"
        >
          {img}
        </Link>
      ) : (
        img
      )}
    </li>
  );
}

export function ClientLogos() {
  if (CLIENTS.length === 0) return null;

  return (
    <Reveal delay={0.1}>
      <div className="mt-16 border-t border-line pt-10 sm:mt-20">
        <div className="flex items-center gap-4">
          <p className="label-mono text-[0.62rem]">TRUSTED BY</p>
          <span aria-hidden className="h-px flex-1 bg-line" />
        </div>
        {/* Centred wrap so a short last row sits in the middle instead of hugging the left edge. */}
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-[4%] gap-y-10 lg:gap-x-[3%]">
          {CLIENTS.map((c) => (
            <Logo key={c.name} client={c} />
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
