import importlib.util
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("generate_content", ROOT / "scripts/generate-content.py")
GENERATOR = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(GENERATOR)


class PublicProjectionTests(unittest.TestCase):
    def project_source(self):
        text = {"en": "Public example", "ja": "公開用の例"}
        return {
            "id": "local-speech", "slug": "local-speech", "title": text,
            "description": text, "association_public_en": "Independent project",
            "association_public": "個人開発", "role_public": text, "stack": ["Python"],
            "association": "PRIVATE_SENTINEL", "basis": ["PRIVATE_SENTINEL"],
            "review_notes": ["PRIVATE_SENTINEL"], "private_notes": {"example": "PRIVATE_SENTINEL"},
            "repo_path": "PRIVATE_SENTINEL",
        }

    def test_project_projection_excludes_internal_evidence_and_raw_association(self):
        projected = GENERATOR.project_projection(self.project_source())
        self.assertNotIn("PRIVATE_SENTINEL", json.dumps(projected))
        self.assertEqual(projected["association"]["en"], "Independent project")
        self.assertEqual(projected["contribution"]["ja"], "公開用の例")

    def test_unreviewed_project_cannot_enter_public_projection(self):
        source = self.project_source()
        source["slug"] = "unreviewed-project"
        with self.assertRaises(KeyError):
            GENERATOR.project_projection(source)

    def test_generated_selection_matches_the_reviewed_curation(self):
        source = (ROOT / "app/content/site-content.ts").read_text().split(" = ", 1)[1]
        content = json.loads(source.removesuffix(";\n"))
        projects = content["projects"]
        self.assertEqual(len(projects), 12)
        self.assertEqual(len({project["slug"] for project in projects}), 12)
        featured = sorted((project for project in projects if project["homeOrder"]), key=lambda project: project["homeOrder"])
        self.assertEqual([project["slug"] for project in featured], ["local-speech", "event-platform", "salon-data-platform", "subsidy-search-pilot"])
        event = next(project for project in projects if project["slug"] == "event-platform")
        self.assertEqual(event["metric"], {"currency": "USD", "period": "annual", "before": 200000, "after": 10000, "percent": 95})
        self.assertEqual(next(project["stack"] for project in projects if project["slug"] == "ongy-viewer")[0]["name"], "AWS")

    def test_approved_career_updates_keep_service_and_company_distinct_and_are_idempotent(self):
        source = (ROOT / "app/content/site-content.ts").read_text().split(" = ", 1)[1]
        content = json.loads(source.removesuffix(";\n"))
        updated = GENERATOR.apply_approved_career_updates(content)
        self.assertEqual(GENERATOR.apply_approved_career_updates(updated), updated)
        self.assertEqual(sum(project["slug"] == "epicpull" for project in updated["projects"]), 1)
        self.assertFalse(any(project["slug"] == "zencard" for project in updated["projects"]))
        self.assertEqual(sum(job["id"] == "zencard" for job in updated["experience"]), 1)
        job = next(job for job in updated["experience"] if job["id"] == "zencard")
        self.assertEqual(job["company"], {"en": "ZenCard", "ja": "株式会社ZenCard"})
        self.assertEqual(job["period"]["en"], "February 2026 – August 2026")
        introduction = next(job for job in updated["experience"] if job["id"] == "introduction")
        self.assertEqual(introduction["title"], {"en": "Full-time CTO", "ja": "正社員・CTO"})
        self.assertNotRegex(json.dumps(updated, ensure_ascii=False), r"(?i)\bintern\b|part[ -]time|アルバイト")
        epicpull = next(project for project in updated["projects"] if project["slug"] == "epicpull")
        self.assertNotIn("metric", epicpull)


if __name__ == "__main__":
    unittest.main()
