import { Note } from "tone/build/esm/core/type/Units";

interface ISample {
  midi: number;
  frequency: number | ComputedRef<number>;
  note: Note | ComputedRef<Note>;
  length: "1n" | "2n" | "4n" | "8n" | "16n" | "32n" | "64n" | "128n";
}

interface QueryFilter {
  id?: number;
  username?: string;
  created?: string;
  original_filename?: string;
  description?: string;
  tag?: string[];
  license?: string;
  is_remix?: boolean;
  was_remixed?: boolean;
  pack?: string;
  is_geotagged?: boolean;
  type?: string;
  duration?: number;
  bitdepth?: number;
  bitrate?: number;
  samplerate?: number;
  filesize?: number;
  channels?: number;
  md5?: string;
  num_downloads?: number;
  avg_rating?: number;
  num_ratings?: number;
  comment?: string;
  comments?: number;
  ac_loudness?: number;
  ac_dynamic_range?: number;
  ac_temporal_centroid?: number;
  ac_log_attack_time?: number;
  ac_single_event?: boolean;
  ac_tonality?: string;
  ac_tonality_confidence?: number;
  ac_loop?: boolean;
  ac_tempo?: number;
  ac_tempo_confidence?: number;
  ac_note_midi?: number;
  ac_note_name?: string;
  ac_note_frequency?: number;
  ac_note_confidence?: number;
  ac_brightness?: number;
  ac_depth?: number;
  ac_hardness?: number;
  ac_roughness?: number;
  ac_boominess?: number;
  ac_warmth?: number;
  ac_sharpness?: number;
  ac_reverb?: boolean;
}

interface BassFilter extends QueryFilter {
  duration: number;
  ac_tempo: number;
  ac_note_midi: number;
}

interface MelodyFilter extends QueryFilter {
  duration: number;
  ac_tempo: number;
  ac_note_midi: number;
}

interface ReverbFilter extends QueryFilter {
  duration: number;
  ac_tempo: number;
  ac_note_midi: number;
  ac_reverb: boolean;
}

interface SearchQuery {
  query: string;
  filter?: string;
  sort?:
  | "score"
  | "duration_desc"
  | "duration_asc"
  | "created_desc"
  | "created_asc"
  | "downloads_desc"
  | "downloads_asc"
  | "rating_desc"
  | "rating_asc";
}

interface SearchResult {
  id: number;
  name: string;
  tags: string[];
  license: string;
}

interface SearchResponse {
  count: number;
  next: string;
  previous: string;
  results: SearchResult[];
}

interface Preview {
  preview_hq_mp3: string;
  preview_lq_mp3: string;
  preview_hq_ogg: string;
  preview_lq_ogg: string;
}

interface Images {
  waveform_m?: string;
  waveform_l?: string;
  spectral_m?: string;
  spectral_l?: string;
  waveform_bw_m?: string;
  waveform_bw_l?: string;
  spectral_bw_m?: string;
  spectral_bw_l?: string;
}

interface SoundInstance {
  id: number;
  url: string; // Assuming HttpUrl translates to string
  name: string;
  tags: string[];
  description: string;
  geotag?: string;
  created: string;
  license: string;
  type: string;
  channels: number;
  filesize: number;
  bitrate: number;
  bitdepth: number;
  duration: number;
  samplerate: number;
  username: string;
  pack?: string;
  pack_name?: string;
  download: string;
  bookmark?: string;
  previews: Preview;
  images: Images;
  num_downloads: number;
  avg_rating: number;
  num_ratings: number;
  rate?: string;
  comments?: string;
  num_comments: number;
  comment?: string;
  similar_sounds?: string;
  analysis: string;
  analysis_frames?: string;
  analysis_stats?: string;
  is_explicit: boolean;
}

interface AudioFile {
  ref: string;
  ts: number;
  user: string;
  size: number;
  key: string;
  amplitudes: number[];
  frequencies: number[];
  url: string;  // Assuming HttpUrl translates to a string URL
}

export type { SearchResponse, SoundInstance, ISample, AudioFile };
