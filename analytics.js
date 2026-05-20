/* PostHog analytics — shared by epicoutdoors.com, the Shopify store,
   and the epicoutdoorsmember.com member portal.
   Project: Epic Outdoors Website (US cloud, project 433382).
   Marketing/store pages load this directly; the portal loads it via
   inc/analytics.asp (see that file for member identify + logout reset). */
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
/* ── Cross-domain handoff ──────────────────────────────────────────
   epicoutdoors.com / the Shopify store and epicoutdoorsmember.com are
   different root domains, so the PostHog cookie can't follow a visitor
   across them. This carries the distinct_id + session_id across that
   boundary in the URL hash, so a visitor stays one continuous person.
   Generic and bidirectional; epicoutdoors.com <-> store links are left
   alone since those share a root domain (and already share the cookie). */
function epicRoot(host) {
  host = (host || "").toLowerCase();
  if (
    host === "epicoutdoorsmember.com" ||
    host.endsWith(".epicoutdoorsmember.com")
  )
    return "member";
  if (host === "epicoutdoors.com" || host.endsWith(".epicoutdoors.com"))
    return "main";
  return null;
}

/* Receiver: if this page was opened via a decorated cross-domain link,
   adopt the incoming identity, then strip it back out of the URL. */
var epicBootstrap = null;
try {
  var epicHash = (location.hash || "").replace(/^#/, "");
  if (epicHash.indexOf("distinct_id=") !== -1) {
    var epicParams = new URLSearchParams(epicHash);
    var inDistinctId = epicParams.get("distinct_id");
    var inSessionId = epicParams.get("session_id");
    if (inDistinctId) {
      epicBootstrap = { distinctID: inDistinctId };
      if (inSessionId) epicBootstrap.sessionID = inSessionId;
      history.replaceState(null, "", location.pathname + location.search);
    }
  }
} catch (e) {}

var epicInit = {
  api_host: "https://us.i.posthog.com",
  defaults: "2026-01-30",
  person_profiles: "identified_only",
  enable_heatmaps: true,
  loaded: function (ph) {
    /* Decorator: when a link is about to be followed to the OTHER Epic
       root domain, tag its hash with the current IDs so the destination
       can pick the visitor up as the same person. */
    try {
      var here = epicRoot(location.hostname);
      if (!here) return;
      var tagLink = function (evt) {
        var a =
          evt.target && evt.target.closest
            ? evt.target.closest("a[href]")
            : null;
        if (!a) return;
        var dest;
        try {
          dest = epicRoot(new URL(a.href, location.href).hostname);
        } catch (err) {
          return;
        }
        if (!dest || dest === here) return;
        try {
          var u = new URL(a.href, location.href);
          var did = ph.get_distinct_id();
          if (!did) return;
          var sid = ph.get_session_id();
          var parts = ["distinct_id=" + encodeURIComponent(did)];
          if (sid) parts.push("session_id=" + encodeURIComponent(sid));
          u.hash = parts.join("&");
          a.href = u.toString();
        } catch (err) {}
      };
      /* mousedown catches middle/modifier clicks, click catches
         left-click and keyboard activation; both fire before the
         browser navigates, and re-tagging a link is harmless. */
      document.addEventListener("mousedown", tagLink, true);
      document.addEventListener("click", tagLink, true);
    } catch (err) {}
  },
};
if (epicBootstrap) epicInit.bootstrap = epicBootstrap;

posthog.init("phc_DeyPGkMvEUzFczrCcxdkuRPCrN6m5a6FnjVwEiqHXwpE", epicInit);

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
