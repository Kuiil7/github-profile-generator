# GitHub Profile Generator

A command-line application that dynamically generates a PDF profile from a GitHub username. The application will be invoked with the following command:

```
node index.js
```

The user will be prompted for a favorite color, which will be used as the background color for cards.

The PDF will be populated with the following:

* Profile image
* User name
* Links to the following:
  * User location via Google Maps
  * User GitHub profile
  * User blog
* User bio
* Number of public repositories
* Number of followers
* Number of GitHub stars
* Number of users following

 [Demo](Prof-Gen.gif).

## PURPOSE

When preparing a report for stakeholders, it is important to have up-to-date information about members of the development team. Rather than navigating to each team member's GitHub profile, a command-line application will allow for quick and easy generation of profiles in PDF format.

HMTL, CSS, Node.js, ES6+, Axios, Inquirer, Electron-html-to

Repo: https://github.com/darh0ky/profile-generator
Project URL: https://darh0ky.github.io/profile-generator/
