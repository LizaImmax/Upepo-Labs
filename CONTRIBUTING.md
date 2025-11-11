# Contributing to Upepo Labs

🌬️ Thank you for your interest in contributing to Upepo Labs! We welcome contributions from students, engineers, researchers, startups, and open-source enthusiasts.

---

## 🧭 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Project Submission Guidelines](#project-submission-guidelines)
- [Development Workflow](#development-workflow)
- [Style Guidelines](#style-guidelines)
- [Review Process](#review-process)
- [Community & Support](#community--support)

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming, inclusive, and harassment-free experience for everyone, regardless of:
- Age, body size, disability, ethnicity, gender identity and expression
- Level of experience, education, socio-economic status
- Nationality, personal appearance, race, religion, or sexual identity and orientation

### Our Standards

**Examples of behavior that contributes to a positive environment:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Examples of unacceptable behavior:**
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project team at **conduct@upepo.io** *(placeholder)*. All complaints will be reviewed and investigated promptly and fairly.

---

## 🤝 How Can I Contribute?

### 1. Submit a Project

Have an innovative cloud, AI, or open-source project? Submit it to Upepo Labs!

See [Project Submission Guidelines](#project-submission-guidelines) below.

### 2. Contribute to the Website

Help us improve the Upepo Labs platform:
- Fix bugs or typos
- Add new features
- Improve documentation
- Enhance UI/UX

### 3. Participate in Events

Join our hackathons, innovation sprints, and research challenges. Check [Events](./events/README.md).

### 4. Write Research

Contribute whitepapers, case studies, or technical insights. See [Research Guidelines](./research/README.md).

### 5. Review Projects

Help review submitted projects, provide feedback, and mentor contributors.

---

## 📦 Project Submission Guidelines

### Eligibility

Projects should focus on one or more of the following:
- ☁️ Cloud-native applications and infrastructure
- 🔐 Cybersecurity and DevSecOps
- 🤖 AI/ML integrations and MLOps
- 🧰 Developer tools and automation
- 🌐 Open-source contributions to cloud ecosystems

### Submission Process

1. **Fork this repository** or use the [Project Submission Template](./templates/project-submission-template.md)

2. **Create a project folder** under `/projects/`:
   ```
   projects/
   └── your-project-name/
       ├── README.md          # Project overview
       ├── ARCHITECTURE.md    # Technical architecture
       ├── docs/              # Additional documentation
       └── src/               # Source code (optional, can link to external repo)
   ```

3. **Fill out the Project README** with:
   - Project name and tagline
   - Problem statement
   - Solution overview
   - Tech stack
   - Architecture diagram
   - Setup instructions
   - Demo or screenshots
   - License
   - Contributors

4. **Submit a Pull Request** with:
   - Title: `[Project Submission] Your Project Name`
   - Description: Brief overview and motivation
   - Checklist (see PR template)

5. **Review & Feedback**
   - Maintainers will review within 7 days
   - You may be asked for revisions or demos
   - Once approved, your project will be published!

### Project Requirements

✅ **Must have:**
- Clear README with setup instructions
- Apache 2.0 or compatible open-source license
- Working demo or proof of concept
- Architecture documentation

✅ **Nice to have:**
- CI/CD pipeline (GitHub Actions)
- Tests (unit, integration, or e2e)
- Infrastructure as Code (Terraform/Pulumi)
- Multi-cloud compatibility

---

## 💻 Development Workflow

### Prerequisites

- **Node.js** 18+ and npm
- **Git**
- (Optional) **Docker** for containerized projects

### Setup

```powershell
# Clone the repository
git clone https://github.com/LizaImmax/Upepo-Labs.git
cd Upepo-Labs

# Install dependencies
npm install

# Run development server
npm run dev
```

### Making Changes

1. **Create a branch** for your work:
   ```powershell
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our [Style Guidelines](#style-guidelines)

3. **Test your changes**:
   ```powershell
   npm test
   npm run lint
   npm run build
   ```

4. **Commit your changes**:
   ```powershell
   git add .
   git commit -m "feat: add your feature description"
   ```

   Use [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` new feature
   - `fix:` bug fix
   - `docs:` documentation changes
   - `style:` formatting, missing semicolons, etc.
   - `refactor:` code restructuring
   - `test:` adding tests
   - `chore:` maintenance tasks

5. **Push to your fork**:
   ```powershell
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** on GitHub

---

## 📐 Style Guidelines

### Code Style

- **TypeScript/JavaScript:** Follow the project's ESLint and Prettier configs
- **Python:** Follow PEP 8, use `black` for formatting
- **Go:** Follow `gofmt` and Go community standards

### Documentation

- Use clear, concise language
- Include code examples where applicable
- Add diagrams for architecture or workflows
- Keep README files up to date

### Git Commits

- Write meaningful commit messages
- Use present tense ("Add feature" not "Added feature")
- Reference issues and PRs where relevant

---

## 🔍 Review Process

### Timeline

- **Initial Review:** Within 7 days
- **Feedback & Revisions:** Ongoing until approved
- **Final Approval:** Requires 2 maintainer approvals

### Criteria

Reviewers will evaluate:
- ✅ Code quality and best practices
- ✅ Documentation completeness
- ✅ Tests and CI/CD
- ✅ Alignment with Upepo Labs mission
- ✅ Security and licensing compliance

### Roles

Contributors can progress through roles based on contributions:

1. **Contributor** — Anyone who submits a project or PR
2. **Reviewer** — Trusted contributors who review projects
3. **Maintainer** — Core team members with merge permissions
4. **Mentor** — Experienced contributors who guide others

*(Role definitions and governance details coming soon)*

---

## 🌐 Community & Support

### Get Help

- **GitHub Discussions:** [Ask questions or share ideas](https://github.com/LizaImmax/Upepo-Labs/discussions)
- **GitHub Issues:** [Report bugs or request features](https://github.com/LizaImmax/Upepo-Labs/issues)
- **Email:** labs@upepo.io *(placeholder)*

### Stay Connected

- **GitHub Org:** [github.com/LizaImmax/Upepo-Labs](https://github.com/LizaImmax/Upepo-Labs)
- **Website:** upeo-labs.com *(coming soon)*

---

## 🙏 Thank You!

Your contributions help make Upepo Labs a thriving hub for innovation and experimentation. Together, we can build cloud solutions that move the world forward.

**🌬️ Let's create something amazing!**

---

## 📝 License

By contributing to Upepo Labs, you agree that your contributions will be licensed under the [Apache License 2.0](LICENSE).
