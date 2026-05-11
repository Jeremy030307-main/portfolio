import { useEffect, useState } from 'react';

let cache = null;
let inflight = null;

const useProjects = () => {
  const [projects, setProjects] = useState(cache ?? []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    if (cache) return;

    if (!inflight) {
      inflight = fetch('/ProjectsData/projects.json')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to load projects');
          return res.json();
        });
    }

    let cancelled = false;
    inflight
      .then((data) => {
        cache = data;
        if (!cancelled) {
          setProjects(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        inflight = null;
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, error, loading };
};

export default useProjects;
