async function getQualifyingResults(year, roundNumber) {
    const response = await fetch(`http://ergast.com/api/f1/${year}/${roundNumber}/qualifying.json`);
    const data = await response.json();
    return data.MRData.RaceTable.Races[0].QualifyingResults;
  }
  
 
  const yearSelected = document.querySelector("#year-bar")
  const roundSelected = document.querySelector("#event-bar")
  const searchBtn = document.querySelector("#search-btn")
  const host = document.querySelector("#host")
  const circuit = document.querySelector("#circuit")
  const laps = document.querySelector("#laps")
  const winner = document.querySelector("#winner")
  const second = document.querySelector("#second")
  const third = document.querySelector("#third")
  const qualifyingResults = document.querySelector("#qualifying-results")
  
  
  searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
  
    
    const result = await getRace(roundSelected.value, yearSelected.value)
    const qualy = await getQualifyingResults(yearSelected.value, roundSelected.value)
  
    
    const hostcountry = result.MRData.RaceTable.Races[0].Circuit.Location.country
    const venue = result.MRData.RaceTable.Races[0].Circuit.circuitName
    const totallaps = result.MRData.RaceTable.Races[0].Results[0].laps
    host.innerHTML = `Host country: ${hostcountry}`
    circuit.innerHTML = `Track name: ${venue}`
    laps.innerHTML = `Race distance: ${totallaps} laps`
  
    
    const p1 = result.MRData.RaceTable.Races[0].Results[0]
    const p2 = result.MRData.RaceTable.Races[0].Results[1]
    const p3 = result.MRData.RaceTable.Races[0].Results[2]
    winner.innerHTML = `<i>Winner:</i> ${p1.Driver.givenName} ${p1.Driver.familyName} (${p1.Driver.nationality}) - ${p1.Constructor.name}</br><i>Race time:</i> ${p1.Time.time}`
    second.innerHTML = `<i>Runner up:</i> ${p2.Driver.givenName} ${p2.Driver.familyName} (${p2.Driver.nationality}) - ${p2.Constructor.name}`
    third.innerHTML = `<i>3rd place:</i> ${p3.Driver.givenName} ${p3.Driver.familyName} (${p3.Driver.nationality}) - ${p3.Constructor.name}`
  
    
    const q1 = qualy[0]
    const q2 = qualy[1]
    const q3 = qualy[2]
    qualifyingResults.innerHTML = `
      <h3>Qualifying Results</h3>
      <ul>
        <li>${q1.Driver.givenName} ${q1.Driver.familyName} (${q1.Driver.nationality}) - ${q1.Constructor.name} - Q1 Time: ${q1.Q1}</li>
        <li>${q2.Driver.givenName} ${q2.Driver.familyName} (${q2.Driver.nationality}) - ${q2.Constructor.name} - Q1 Time: ${q2.Q1}</li>
        <li>${q3.Driver.givenName} ${q3.Driver.familyName} (${q3.Driver.nationality})
  
}
