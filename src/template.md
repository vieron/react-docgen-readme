<%= h3(c.description) %>

<%= h4('Props') %>
<% _.forEach(c.props, function(prop, propName) { %>
<%= h5(propName) %>

- <%= strong('required:') %> <%= prop.required %>
- <%=strong('type:') %> <%= prop.type.name %> <% if (prop.type.value && prop.type.value.name) { %><%= prop.type.value.name %><% } %>

<%= prop.description %>
<% }); %>