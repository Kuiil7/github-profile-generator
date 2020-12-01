# GitHub Profile Generator

A command-line application that dynamically generates a PDF profile from a GitHub username. The application will be invoked with the following command:

```
node index.js
```

The user will be prompted for a favorite color, which will be used as the background color for cards.

The PDF will be populated with the following:

1. Profile image
2. User name
3. Links to the following:
      a. User location via Google Maps
      b. User GitHub profile
      c. User blog
4. User bio
5. Number of public repositories
6. Number of followers
7. Number of GitHub stars
8. Number of users following

![APP DEMO](/assets/Prof-Gen.gif)

## PURPOSE

When preparing a report for stakeholders, it is important to have up-to-date information about members of the development team. Rather than navigating to each team member's GitHub profile, a command-line application will allow for quick and easy generation of profiles in PDF format.

## BUILT WITH

* HMTL
* CSS
* Node.js
* ES6+
* Axios
* Inquirer
* Electron-html-to



