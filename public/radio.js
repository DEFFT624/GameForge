const $ = id => document.getElementById(id);
const audio = $('radio-audio');
audio.volume = 0.5;
$('radio-volume').addEventListener('input', event => { audio.volume = Number(event.target.value); });
let tracks = [], current = -1, repeat = false;
const status = message => { $('radio-status').textContent = message; };
function clearTracks() {
  audio.pause(); audio.removeAttribute('src'); audio.load();
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
  audio.src = tracks[current].url; render();
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
