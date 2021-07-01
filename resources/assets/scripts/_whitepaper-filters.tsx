import React, { Component } from "react";
var base64 = require("base-64");

interface AppProps {
  searchText: any;
  pageSlug: any;
}
interface AppState {
  posts: Array<any>;
  categories: Array<any>;
  services: Array<any>;
  industries: Array<any>;
  selectedCat: string;
  buttonText: string;
  postOffset: number;
  postsPerPage: number;
  categoryUrl: string;
  selectedClass: string;
  searchQuery: string;
  totalPosts: any;
  totalPostsArr: Array<any>;
  pageOneActive: any;
  pageTwoActive: any;
}

export default class WhitepaperFilters extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      posts: [],
      categories: [],
      services: [],
      industries: [],
      selectedCat: "",
      buttonText: "Content is loading...",
      postOffset: 0,
      postsPerPage: 9,
      categoryUrl: "",
      selectedClass: "hide",
      searchQuery: "",
      totalPosts: -1,
      totalPostsArr: [],
      pageOneActive: "active",
      pageTwoActive: "",
    };

    this.loadBlogPosts = this.loadBlogPosts.bind(this);
    this.loadCategories = this.loadCategories.bind(this);
    this.loadIndustries = this.loadIndustries.bind(this);
    this.loadServices = this.loadServices.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleCategoryRemoval = this.handleCategoryRemoval.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.loadBlogPosts();
    this.loadCategories();
    this.loadIndustries();
    this.loadServices();
  }

  componentDidMount() {
    // @ts-ignore
    //jQuery(".sidebar.col-md-3").insertAfter(jQuery("aside"));
  }

  loadBlogPosts() {
    const fetchUrl = `/wp-json/wp/v2/posts?per_page=${this.state.postsPerPage}&offset=${this.state.postOffset}&_embed${this.state.categoryUrl}`;
    console.log(fetchUrl);

    var formdata = new FormData();
    formdata.append("username", "Zach");
    formdata.append("password", "08N+hy*rZll_");

    var requestOptions: any = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("/wp-json/jwt-auth/v1/token?", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let headers = new Headers();
        headers.append("Authorization", `Bearer ${result.token}`);

        fetch(fetchUrl, {
          method: "GET",
          headers: headers,
        })
          .then((response) => response.json())
          .then((data) => {
            this.setState({ posts: this.state.posts.concat(data) });
            this.setState({ buttonText: "View More" });
          });
      });
  }

  searchThenLoadBlogPosts(searchTerm: any) {
    let headers = new Headers();
    headers.append(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9zcGlyZS5oaW5nZWRldi5jb20iLCJpYXQiOjE2MTg4NTAwMzQsIm5iZiI6MTYxODg1MDAzNCwiZXhwIjoxNjE5NDU0ODM0LCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.3xEJnXjDBtA6EvQyrBoUXfkVCM8OX3cza5y1Atcgi2s"
    );

    const fetchUrl = `/wp-json/wp/v2/posts?per_page=${this.state.postsPerPage}&offset=${this.state.postOffset}&_embed${this.state.categoryUrl}&search=${searchTerm}`;
    console.log(fetchUrl);

    fetch(fetchUrl, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ posts: this.state.posts.concat(data) });
        this.setState({ buttonText: "View More" });
      });
  }

  loadCategories() {
    fetch("/wp-json/wp/v2/categories")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ categories: this.state.categories.concat(data) });
      });
  }

  loadIndustries() {
    fetch("/wp-json/wp/v2/library_industry")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ industries: this.state.industries.concat(data) });
      });
  }

  loadServices() {
    fetch("/wp-json/wp/v2/library_primary_service")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ services: this.state.services.concat(data) });
      });
  }

  handleButtonClick(event: any) {
    event.preventDefault();
    this.setState({ buttonText: "Content is loading..." });
    this.setState(
      { postOffset: this.state.postOffset + this.state.postsPerPage },
      () => {
        this.loadBlogPosts();
      }
    );
  }

  handleCategoryClick(categoryId: number, categoryName: string) {
    this.setState({ buttonText: "Content is loading..." });
    this.setState({ selectedCat: categoryName });
    this.setState({ selectedClass: "show" });

    this.setState({ posts: [] }, () => {
      this.setState({ postOffset: 0 }, () => {
        this.setState({ categoryUrl: `&categories=${categoryId}` }, () => {
          this.loadBlogPosts();
        });
      });
    });
  }

  handleServiceClick(categoryId: number, categoryName: string) {
    //localStorage.setItem("service", categoryName);
    if (categoryId == -1) {
      document.location.href = this.props.pageSlug;
    } else {
      document.location.href = this.props.pageSlug + "/?service=" + categoryId;
    }
  }

  handleIndustryClick(categoryId: number, categoryName: string) {
    //localStorage.setItem("industry", categoryName);
    if (categoryId == -1) {
      document.location.href = this.props.pageSlug;
    } else {
      document.location.href = this.props.pageSlug + "/?industry=" + categoryId;
    }
  }

  handleCategoryRemoval() {
    this.setState({ buttonText: "Content is loading..." });
    this.setState({ selectedClass: "hide" });

    this.setState({ selectedCat: "" }, () => {
      this.setState({ categoryUrl: "" }, () => {
        this.setState({ postOffset: 0 }, () => {
          this.setState({ posts: [] }, () => {
            this.loadBlogPosts();
          });
        });
      });
    });
  }

  handleSearchTyping(e: any, searchQuery: string) {
    //console.log("IN HANDLE SEARCH TYPING", e);

    if (e == "Enter") {
      //localStorage.setItem("search", searchQuery);
      document.location.href =
        this.props.pageSlug + "/?searchQuery=" + searchQuery;
    }
  }

  handlePageClick(pageNumber) {
    this.setState({ pageOneActive: pageNumber == 0 ? "active" : "" });
    this.setState({ pageTwoActive: pageNumber == 1 ? "active" : "" });

    this.setState({ buttonText: "Content is loading..." });
    this.setState({ selectedClass: "show" });

    this.setState({ posts: [] }, () => {
      this.setState(
        { postOffset: pageNumber * this.state.postsPerPage },
        () => {
          this.loadBlogPosts();
        }
      );
    });
  }

  render() {
    return (
      <section id="blogPage">
        <div className="sidebar">
          <div className="media-boxes-search">
            <span className="media-boxes-icon fa fa-search"></span>
            <input
              onKeyDown={(event) => {
                //console.log(event.currentTarget.value);
                // @ts-ignore
                this.handleSearchTyping(event.key, event.currentTarget.value);
              }}
              type="text"
              id="search"
              placeholder={this.props.searchText}
              default-value=""
            />
            <span className="media-boxes-clear fa fa-close"></span>
          </div>

          <div className="media-boxes-drop-down">
            <div className="media-boxes-drop-down-header">
              <i className="fas fa-sort-down"></i>
            </div>
            <ul
              className="media-boxes-drop-down-menu filters"
              data-id="project-type"
              default-value="*"
            >
              <li className="cat-item">
                <a
                  onClick={() => this.handleServiceClick(-1, "all")}
                  dangerouslySetInnerHTML={{ __html: "All Services" }}
                />
              </li>
              {this.state.services.map((category, id) => {
                return (
                  <li className="cat-item" key={id}>
                    <a
                      onClick={() =>
                        this.handleServiceClick(category.id, category.name)
                      }
                      dangerouslySetInnerHTML={{ __html: category.name }}
                    />
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="media-boxes-drop-down">
            <div className="media-boxes-drop-down-header">
              <i className="fas fa-sort-down"></i>
            </div>
            <ul
              className="media-boxes-drop-down-menu filters"
              data-id="project-type"
              default-value="*"
            >
              <li className="cat-item">
                <a
                  onClick={() => this.handleServiceClick(-1, "all")}
                  dangerouslySetInnerHTML={{ __html: "All Industries" }}
                />
              </li>
              {this.state.industries.map((category, id) => {
                return (
                  <li className="cat-item" key={id}>
                    <a
                      onClick={() =>
                        this.handleIndustryClick(category.id, category.name)
                      }
                      dangerouslySetInnerHTML={{ __html: category.name }}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}
