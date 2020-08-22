/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import foamTreeDataObj from '../data/foamTreeDataObj.js';
// const element = document.getElementById('details');
// console.log(element);

// <img class="avatar" src="<%- owner.avatar_url %>"/>
// <div class="info">
//   <h2><a target="_blank" href="<%- owner.html_url %>"><%- owner.login %></a>/&#8203;<a target="_blank" href="<%- html_url %>"><%- name %></a></h2>
//   <div class="stats">
//     <img src="assets/svg/star.svg"/> <span><%- stargazers_count %></span>
//     <img class="watchers" src="assets/svg/eye.svg"/> <span><%- watchers_count %></span>
//     <img class="forks" src="assets/svg/fork.svg"/> <span><%- forks_count %></span>
//   </div>

//   <div class="description"><%- description %></div>
//   <a target="_blank" href="<%- homepage %>"><%- homepage %></a>

//   <hr/>

//   <div style="color: #888">
//     created: <span><%- moment(created_at).fromNow() %></span><br/>
//     last push: <span><%- moment(pushed_at).fromNow() %></span><br/>
//     last update: <span><%- moment(updated_at).fromNow() %></span>
//   </div>
// </div>
// <div class="close">&times;</div>
// `;

window.addEventListener('load', () => {
  // Perform FoamTree embedding here
  if (CarrotSearchFoamTree.supported) {
    const foamtree = new CarrotSearchFoamTree({
      id: 'data-vis',
      dataObject: foamTreeDataObj,
      layout: 'ordered',
      layoutByWeightOrder: true,
      stacking: 'flattened',
      descriptionGroupSize: 0.12,
      descriptionGroupDistanceFromCenter: 0,
      groupLabelFontFamily: 'Oxygen',
      groupLabelMinFontSize: 16,
      groupLabelMaxFontSize: 24,
      groupLabelVerticalPadding: 0.1,
      groupLabelHorizontalPadding: 0.8,
      groupLabelLineHeight: 1.3,
      groupBorderRadius: 0,
      groupBorderWidth: 1,
      groupInsetWidth: 0,
      groupStrokeWidth: 1,
      maxGroupLevelsDrawn: 4,
      maxGroupLabelLevelsDrawn: 4,
    });

    window.addEventListener(
      'resize',
      (function () {
        let timeout;
        return function () {
          window.clearTimeout(timeout);
          timeout = window.setTimeout(foamtree.resize, 300);
        };
      })()
    );

    // set some additional properties for the foamTree object
    foamtree.set({
      groupFillType: 'plain',
      groupLabelColorThreshold: -1,
      groupLabelDarkColor: '#192a56',
      rainbowStartColor: '#f5f6fa',
      rainbowEndColor: '#f5f6fa',
      rainbowLightnessCorrection: 0,
      rainbowColorDistribution: 'linear',
      groupBorderRadius: 0,
      onGroupClick(event) {
        // console.log(event);
        event.preventDefault();
        const data = event.group;

        // const element = document.getElementById('oudetailstput')

        console.log(data);
        const html = ejs.render(
          ` <h3>
          <%= data.label %>
          </h3>
          <% if (data.imported) { %>
            <h4>Imports</h4>
            <ul>
              <% data.imported.forEach((obj)=>{ %>
                <li class="pink">
                  <%= obj.fileName %>
                </li>
                <% }) %>
            </ul>
          <% } %>
    
          <% if (data.functionDeclarations) { %>
            <h4>Function Declarations</h4>
            <ul>
              <% data.functionDeclarations.forEach((obj)=>{ %>
                <li class="blue">
                  <%= obj.name %>
                 <span>
                  (
                  <%= obj.parameters %>
                  )
                  </span>
                </li>
                <% }) %>
            </ul>
          <% } %>

          <% if (data.functionCalls) { %>

            <h4>Function Calls</h4>
            <ul>
              <% data.functionCalls.forEach((obj)=>{ %>
                <li class="green">
                  <%= obj.name %>
                  <span>
                    (
                      <% obj.arguments.forEach((el)=>{ %>
                        <%  console.log(el) %>

                        <% if( el === null ) { 'null'  %>

                          <% } else if (typeof el === 'object') { %>
                            
                            <%= el.callbackName %> 
                            
                          
                            <% } else {%>
                              <%= el %>
                              <% } %>
                          <% }) %>
                        
                    )
                    </span>
                </li>
                <% }); %>
            </ul>
          <% } %>
          
          
          
          
          
          
          `,

          { data: data }
        );
        document.getElementById('details').innerHTML = html;
        document.getElementById('details').classList.add('opened');
        // console.log(JSON.stringify(details, null, 2));

        // if (event.group.unselectable) {
        //   event.preventDefault();
        // }

        const closeBtn = document.getElementById('container');
        // .addEventListener('click', function (evt) {
        //   console.log(evt);
        // });
        console.log(closeBtn);
      },
    });
    foamtree.redraw();
  } else {
    console.log('Unsupported browser for FoamTree visualizations');
  }
});
