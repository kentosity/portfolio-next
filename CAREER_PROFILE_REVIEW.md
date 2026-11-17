# Private career-profile review branch

This branch starts from the source of the live portfolio, `kentosity/portfolio-next` at `a9a552be1db592f02d8ad2a6db372b253911bf3a`. It is stored on the private `kentosity/portfolio` remote for review. That remote’s default branch is a separate older timeline experiment: do not merge this branch into that default branch.

The canonical source is private `kentosity/resume/profile.json`, owned by Aide. `app/content/career-profile.json` and the new concise case studies are generated projections. Regenerate from the resume checkout with `python3 scripts/render_profile.py --portfolio-dir /Volumes/MiniStorage/projects/portfolio-next`.

The proposal adds FalconeX founder/operator positioning, groups TXTO and TELA as FalconeX client work, and replaces conflicting metrics on the main pages with factual scope descriptions. New historical summary routes preserve the original detailed pages. The existing legacy direct routes have not been comprehensively re-audited.

Confirm dates, formal titles, legal/trading identity, personal contribution, public client wording and all metrics in the resume repository’s `open-questions.md` before publishing. Source inspection is not proof of deployment, adoption, sole authorship or business results. No production deployment or external profile edit is part of this branch.
