/**
 * \brief This script will send product fires that are reported by users via
 *        a Google Form to Clubhouse.io.
 */

/** Global Questions **/
var questionOrgID = 449007094;
var questionRequestType = 198527756;
var questionPriority = 1098463841;

/** Request Questions **/
var rquestionRequest = 2064373072;
var rquestionKPI = 1578312154;
var rquestionEffect = 1846203053;

/** Bug Questions **/
var bquestionDescription = 1542461407;
var bquestionReproduce = 1244138770;
var bquestionBrowser = 1135776227;
var bquestionProduct = 393099624;
var bquestionID = 1409830767;
var bquestionFullStory = 1805680043;
var bquestionOther = 1562877119;
var bquestionAttachment = 1258173761;



var isBug = false;

//This is for fires
var clubhouseToken = 'XXXXX-XXXXX';
var clubhouseRootURL = 'https://api.clubhouse.io/';
var clubhouseStoryEP = 'api/v1/stories';
var clubhouseStoryURL = clubhouseRootURL + clubhouseStoryEP + "?token=" + clubhouseToken;


function OnFormSubmit(e) {
  var form = FormApp.getActiveForm();
  var email = form.getResponses().pop().getRespondentEmail()
  var latestItemResponses = form.getResponses().pop().getItemResponses();
  var desc = "";
  var title = "";
  var priority = 5;
  var description = "";


  for (var i = 0; i < latestItemResponses.length; i++)
  {
    var itemResponse = latestItemResponses[i];
    var itemId = itemResponse.getItem().getId();
    var resp = itemResponse.getResponse();

    switch(itemId)
    {
      case(questionOrgID):
        desc += "Organization: " + resp + "\n";
        break;
      case(questionRequestType):
        desc += "Type: " + resp + "\n";
        if(resp == "Bug")
        {
          isBug = true;
        }
        break;
      case(questionPriority):
        desc += "Priority: " + resp + "\n";
        priority = resp;
        break;
      case(rquestionRequest):
        desc += "Request: " + resp + "\n";
        //Removing this for the time being
        //title += resp + "request from, " + email;
        break;
      case(rquestionKPI):
        desc += "KPI: " + resp + "\n";
        break;
      case(rquestionEffect):
        desc += "Effect: " + resp + "\n";
        break;
      case(bquestionDescription):
        desc += "Bug Description: " + resp + "\n";
        description = resp;
        break;
      case(bquestionReproduce):
        desc += "Bug Steps to Reproduce: " + resp + "\n";
        break;
      case(bquestionBrowser):
        desc += "Bug Browser/OS: " + resp + "\n";
        break;
      case(bquestionProduct):
        desc += "Bug Product: " + resp + "\n";
        break;
      case(bquestionID):
        desc += "Bug Business/Student ID: " + resp + "\n";
        break;
      case(bquestionAttachment):
        desc += "https://drive.google.com/open?id=" + resp + "\n";
        break;
      case(bquestionFullStory):
        desc += "Bug Full Story Link: " + resp + "\n";
        break;
      case(bquestionOther):
        desc += "Bug Other: " + resp + "\n";
        break;
    }
  }

  title = "Request From: " + email;

  //This is for the Slack integration for fires
  if((priority < 2) && (isBug==true))
  {

    var payloadClubhouse = {
      "name": "test name 2",
      "project_id": 147,
      "story_type": "bug",
      "description": "test",
      "labels": [
        {
          "name": "request_from_" + email
        }
      ]
    }

    sendToURL(clubhouseStoryURL, payloadClubhouse);

  }
}

function sendToURL(url,payload) {
   var options =  {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : JSON.stringify(payload)
  };
  return UrlFetchApp.fetch(url, options)
}


