const CameraIcon = ({ className = "" }) => {
  return (
    <svg
      className="w-3 h-3 fill-slate-600"
      data-prefix="fas"
      data-icon="video-plus"
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      id="ember377st371"
      data-test="exercise-add-form-toggle"
    >
      <path
        className={className}
        fill="currentColor"
        d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm512 64c0-11.8-6.5-22.6-16.9-28.2s-23-5-32.9 1.6l-96 64L416 174.9V192 320v17.1l14.2 9.5 96 64c9.8 6.5 22.4 7.2 32.9 1.6s16.9-16.4 16.9-28.2V128zM216 184v48h48c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v48c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H120c-13.3 0-24-10.7-24-24s10.7-24 24-24h48V184c0-13.3 10.7-24 24-24s24 10.7 24 24z"
      ></path>
    </svg>
  );
};
export default CameraIcon;
