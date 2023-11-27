This frontend script is mainly revised by Leftover Killer, an Android App which we finished in the courses.


Since we found that many students would like to cook by themselves but sometimes they didn't have ideas on what to cook by only the ingredients they have (because they may not have time to buy more ingredients), we build up this application especially for them. 

Users can select whether they want to register to be a member. The majority difference is whehter the information they stored could be transfered to another machine. In the application, users can directly find the recipe by its name. Also, they can first add all ingredients they have into the pantry, and then they can matching the recipe by the ingredeints they have.




INSTALL:
<ol>
<li>git clone https://github.com/uycuhnt2467/Leftoverkiller-frontend.git
<li>docker build -t leftoverkiller-frontend-image .
</ol>

RUN:
<ol>
<li>docker run -it --rm -p 3000:3000 --name leftoverkiller-frontend-app leftoverkiller-frontend-image
</ol>
