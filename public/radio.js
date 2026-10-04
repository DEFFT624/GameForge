const $ = id => document.getElementById(id);
const audio = $('radio-audio');
audio.volume = 0.5;
$('radio-volume').addEventListener('input', event => { audio.volume = Number(event.target.value); });
let tracks = [], current = -1, repeat = false;
const status = message => { $('radio-status').textContent = message; };
const position = $('radio-position');
function timeLabel(seconds) {
  const whole = Math.max(0, Math.floor(seconds));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`;
}
function syncPosition(reset = false) {
  const duration = !reset && Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 0;
  const elapsed = duration && Number.isFinite(audio.currentTime) ? Math.min(duration, Math.max(0, audio.currentTime)) : 0;
  position.disabled = !duration; position.max = String(duration || 1); position.value = String(elapsed);
  $('radio-time').textContent = `${timeLabel(elapsed)} / ${timeLabel(duration)}`;
  position.setAttribute('aria-valuetext', `${timeLabel(elapsed)} of ${timeLabel(duration)}`);
}
for (const event of ['loadedmetadata', 'durationchange', 'timeupdate', 'seeked']) audio.addEventListener(event, () => syncPosition());
audio.addEventListener('emptied', () => syncPosition(true));
position.addEventListener('input', () => {
  if (position.disabled || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
  const requested = Number(position.value);
  if (!Number.isFinite(requested)) return;
  try { audio.currentTime = Math.max(0, Math.min(audio.duration, requested)); syncPosition(); }
  catch { status('This track cannot seek yet. Wait for it to load and try again.'); }
});
function clearTracks() {
  audio.pause(); audio.removeAttribute('src'); audio.load();
  syncPosition(true);
  for (const track of tracks) URL.revokeObjectURL(track.url);
  tracks = []; current = -1;
}
function render() {
  $('radio-queue').replaceChildren(...(tracks.length ? tracks.map((track, i) => {
    const option = document.createElement('option'); option.value = String(i); option.textContent = track.name; return option;
  }) : [new Option('No songs selected', '')]));
  $('radio-queue').disabled = !tracks.length;
  for (const id of ['radio-prev', 'radio-next', 'radio-clear']) $(id).disabled = !tracks.length;
  $('radio-track').textContent = tracks[current]?.name || 'Your adventure. Your soundtrack.';
  if (current >= 0) $('radio-queue').value = String(current);
}
async function select(index, play = false) {
  if (!tracks.length) return;
  current = (index + tracks.length) % tracks.length;
  audio.src = tracks[current].url; syncPosition(true); render();
  if (play) {
    try { await audio.play(); } catch { status('Could not play this track. Try Play, or choose another audio file.'); }
  }
}
$('radio-files').addEventListener('change', event => {
  const files = Array.from(event.target.files || []);
  if (!files.length) return;
  const supported = files.filter(f => (f.type.startsWith('audio/') || /\.(mp3|wav|ogg|m4a|flac)$/i.test(f.name)) && f.size > 0 && f.size <= 100 * 1024 * 1024).slice(0, 30);
  if (!supported.length) { status('Choose audio files up to 100 MB each. Your current playlist is unchanged.'); event.target.value = ''; return; }
  clearTracks(); tracks = supported.map(file => ({name: file.name, url: URL.createObjectURL(file)}));
  select(0); status(`${tracks.length} songs ready. Press Play. Files stay on this computer.${supported.length < files.length ? ' Some files were skipped (30-song / 100 MB limits or unsupported type).' : ''}`);
  event.target.value = '';
});
$('radio-prev').addEventListener('click', () => select(current - 1, !audio.paused));
$('radio-next').addEventListener('click', () => select(current + 1, !audio.paused));
$('radio-queue').addEventListener('change', event => select(Number(event.target.value), !audio.paused));
$('radio-repeat').addEventListener('click', () => {
  repeat = !repeat; audio.loop = repeat;
  $('radio-repeat').setAttribute('aria-pressed', String(repeat)); $('radio-repeat').textContent = `Repeat: ${repeat ? 'song' : 'off'}`;
});
$('radio-clear').addEventListener('click', () => { clearTracks(); render(); status('Playlist cleared. Choose songs to start another mix.'); });
audio.addEventListener('ended', () => { if (!repeat && current < tracks.length - 1) select(current + 1, true); });
audio.addEventListener('error', () => { if (tracks.length) status('This audio file could not be played. Try another track or format.'); });
window.addEventListener('pagehide', clearTracks);
