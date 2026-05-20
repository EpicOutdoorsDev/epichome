/* PostHog analytics — shared across every page of epicoutdoors.com.
   Project: Epic Outdoors Website (US cloud).
   To add tracking to a new page, put this in its <head>:
       <script src="/analytics.js"></script>
*/
!(function (t, e) {
  var o, n, p, r;
  e.__SV ||
    (window.posthog && window.posthog.__loaded) ||
    ((window.posthog = e),
    (e._i = []),
    (e.init = function (i, s, a) {
      function g(t, e) {
        var o = e.split(".");
        (2 == o.length && ((t = t[o[0]]), (e = o[1])),
          (t[e] = function () {
            t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
          }));
      }
      (((p = t.createElement("script")).type = "text/javascript"),
        (p.crossOrigin = "anonymous"),
        (p.async = !0),
        (p.src =
          s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") +
          "/static/array.js"),
        (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(
          p,
          r,
        ));
      var u = e;
      for (
        void 0 !== a ? (u = e[a] = []) : (a = "posthog"),
          u.people = u.people || [],
          u.toString = function (t) {
            var e = "posthog";
            return (
              "posthog" !== a && (e += "." + a),
              t || (e += " (stub)"),
              e
            );
          },
          u.people.toString = function () {
            return u.toString(1) + ".people (stub)";
          },
          o =
            "Mi Ri init Vi Gi Rr Wi Ji Bi capture calculateEventProperties tn register register_once register_for_session unregister unregister_for_session an getFeatureFlag getFeatureFlagPayload getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync un identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset setIdentity clearIdentity get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException addExceptionStep captureLog startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty nn Xi createPersonProfile setInternalOrTestUser sn Hi cn opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing Ki debug Lr rn getPageViewId captureTraceFeedback captureTraceMetric Di".split(
              " ",
            ),
          n = 0;
        n < o.length;
        n++
      )
        g(u, o[n]);
      e._i.push([i, s, a]);
    }),
    (e.__SV = 1));
})(document, window.posthog || []);
posthog.init("phc_DeyPGkMvEUzFczrCcxdkuRPCrN6m5a6FnjVwEiqHXwpE", {
  api_host: "https://us.i.posthog.com",
  defaults: "2026-01-30",
  person_profiles: "identified_only",
  enable_heatmaps: true,
});

/* ── Member identification (Epic Outdoors member portal) ──────────
   On the member portal, inc/analytics.asp sets these globals
   server-side from the ASP Session, before this file loads:
       window.__epicMember — a logged-in member's id / email / name
       window.__epicReset  — true on the post-logout landing page
   Both are portal-only: the marketing site and Shopify store load
   this same file but never set them, so this block is a no-op there. */
try {
  if (window.__epicReset) {
    posthog.reset();
  }
  var epicM = window.__epicMember;
  if (epicM && epicM.id) {
    var epicProps = { epic_id: epicM.id };
    if (epicM.email) epicProps.email = epicM.email;
    var epicName = ((epicM.firstName || "") + " " + (epicM.lastName || ""))
      .replace(/\s+/g, " ")
      .trim();
    if (epicName) epicProps.name = epicName;
    if (epicM.firstName) epicProps.first_name = epicM.firstName;
    if (epicM.lastName) epicProps.last_name = epicM.lastName;
    posthog.identify(String(epicM.id), epicProps);
  }
} catch (e) {}
