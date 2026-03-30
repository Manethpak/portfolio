export default interface Props {
  title?: string;
  desc?: string;
  image?: string;
  canonical?: string;
  robots?: string;
  ogType?: string;
  meta?: Record<string, string>;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}
