import React from "react";
import { mergeClass } from "../styles";
import { locationTagMetaClass, locationTagRecipe } from "./styles";

export type LocationDanger = "safe" | "contested" | "hostile";

export interface LocationTagProps {
  name: string;
  zone?: string;
  danger?: LocationDanger;
  status?: string;
  className?: string;
}

export function LocationTag({ name, zone, danger = "safe", status, className }: LocationTagProps) {
  return (
    <article
      className={mergeClass(locationTagRecipe({ danger }), className)}
      data-danger={danger}
      aria-label={`${name} ${danger} location`}
    >
      <span className={locationTagMetaClass}>{zone ?? "Location"}</span>
      <strong>{name}</strong>
      {status ? <span className={locationTagMetaClass}>{status}</span> : null}
    </article>
  );
}
