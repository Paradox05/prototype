// for the time being i am just going to pass in my github username until i am able 
// to get it from the user input
// https://www.w3schools.com/js/js_input_examples.asp
// https://www.w3schools.com/howto/howto_css_timeline.asp
// https://getbootstrap.com/docs/4.0/components/forms/
// https://stackoverflow.com/questions/42804948/how-to-split-a-string-based-of-capital-letters
function getUser() {
    var x = document.getElementById("frm1")
    var text = ""
    var i;
    for (i = 0; i < x.length ;i++) {
        text += x.elements[i].value ;
    }
    getRepo(text)
}

function getRepo(user) {
    
    var call = fetch("https://api.github.com/users/" + user + "/repos?sort=updated")

    call.then(output => {
        var jres = output.json()

        jres.then(json => {
            if(json.message) {
                alert('Incorrect Github Username')
                return
            }
            generate(json)
        })
        jres.catch(code => {
            alert('An error occured please try again:' + code.toString())
        })
    })
    call.catch(code => {
        alert('Error with GitHub API: ' + code.toString())
    })

}


function generate(json) {
    var getTime = document.getElementsByClassName("timeline")[0]
    getTime.innerHTML = ""
    var project
    var projectH
    var iff
    var side = "left"

    for(var i = 0; i < json.length; i++) {
        project = json[i].name.split("-")
        if(project.length <= 1) {
            project = json[i].name.match(/[A-Z]+[^A-Z]*|[^A-Z]+/g);
        }
        for (var j = 0; j < project.length; j++) {
            project[j] = project[j][0].toUpperCase() + project[j].slice(1, project[j].length)
        }


        iff = (json[i].fork) ? 'Copy of Repo - ' : 'Original Version - '
        projectH = (json[i].homepage) ? ' | <a href= "' + json[i].homepage + '">Project Homepage<a/>' : ''
        getTime.innerHTML += '<div class="container-' + side + '">' +
        '<div class="content">' +
            '<h2>' + project.join(" ") + '</h2>' +
            '<p>' +
                json[i].description +
            '</p>' +
            '<br>' +
            iff + json[i].language + ' - <a href="' + json[i].html_url + 
            '">View Code</a>' + projectH +
        '</div>' +
    '</div>'
        
        side = (side == "left") ? "right" : "left"

    }
    


}

