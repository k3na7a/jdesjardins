export function Login() {
  return (
    <section>
      <form>
        <label htmlFor="username" className="form-label">
          Username:
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="username"
          required
        />
        <button type="button" className="btn btn-primary">
          CLICK
        </button>
      </form>
    </section>
  );
}
