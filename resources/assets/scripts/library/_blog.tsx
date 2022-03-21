import React, { Component } from "react";
var base64 = require("base-64");

interface AppProps {}
interface AppState {
  posts: Array<any>;
  pagesArr: Array<any>;
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
  pages: any;
  showAllPages: any;
}

export default class Blog extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      posts: [],
      pagesArr: [],
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
      pages: 1,
      showAllPages: false,
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
    formdata.append("password", "nullandvoid");

    var requestOptions: any = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(fetchUrl, {
      method: "GET",
    })
      .then((response) => {
        this.setState({
          pagesArr: [],
        });
        this.setState({
          pages: response.headers.get("X-WP-TotalPages"),
        });
        // @ts-ignore
        for (
          let i = 0;
          i < // @ts-ignore
          parseInt(response.headers.get("X-WP-TotalPages"));
          i++
        ) {
          console.log("in loop now!");
          this.setState({
            pagesArr: [...this.state.pagesArr, i + 1],
          });
        }

        return response.json();
      })
      .then((data) => {
        this.setState({ posts: this.state.posts.concat(data) });
        this.setState({ buttonText: "View More" });
      });
  }

  searchThenLoadBlogPosts(searchTerm: any) {
    const fetchUrl = `/wp-json/wp/v2/posts?per_page=${this.state.postsPerPage}&offset=${this.state.postOffset}&_embed${this.state.categoryUrl}&search=${searchTerm}`;
    console.log(fetchUrl);

    fetch(fetchUrl, {
      method: "GET",
    })
      .then((response) => {
        this.setState({
          pagesArr: [],
        });
        this.setState({
          pages: response.headers.get("X-WP-TotalPages"),
        });
        // @ts-ignore
        for (
          let i = 0;
          i < // @ts-ignore
          parseInt(response.headers.get("X-WP-TotalPages"));
          i++
        ) {
          console.log("in loop now!");
          this.setState({
            pagesArr: [...this.state.pagesArr, i + 1],
          });
        }

        return response.json();
      })
      .then((data) => {
        this.setState({ posts: this.state.posts.concat(data) });
        this.setState({ buttonText: "View More" });
      });
  }

  loadCategories() {
    fetch("/wp-json/wp/v2/categories?per_page=50")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          categories: this.state.categories.concat(data),
        });
      });
  }

  loadIndustries() {
    fetch("/wp-json/wp/v2/blog_industry?per_page=50")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          industries: this.state.industries.concat(data),
        });
      });
  }

  loadServices() {
    fetch("/wp-json/wp/v2/blog_service?per_page=50")
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
    this.setState({ buttonText: "Content is loading..." });
    this.setState({ selectedCat: categoryName });
    this.setState({ selectedClass: "show" });

    this.setState({ posts: [] }, () => {
      this.setState({ postOffset: 0 }, () => {
        if (categoryId == -1) {
          this.setState({ categoryUrl: `` }, () => {
            this.loadBlogPosts();
          });
        } else {
          this.setState({ categoryUrl: `&blog_service=${categoryId}` }, () => {
            this.loadBlogPosts();
          });
        }
      });
    });
  }

  handleIndustryClick(categoryId: number, categoryName: string) {
    this.setState({ buttonText: "Content is loading..." });
    this.setState({ selectedCat: categoryName });
    this.setState({ selectedClass: "show" });

    this.setState({ posts: [] }, () => {
      this.setState({ postOffset: 0 }, () => {
        if (categoryId == -1) {
          this.setState({ categoryUrl: `` }, () => {
            this.loadBlogPosts();
          });
        } else {
          this.setState({ categoryUrl: `&blog_industry=${categoryId}` }, () => {
            this.loadBlogPosts();
          });
        }
      });
    });
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
      //console.log("E .KEY IS ENTER");
      this.setState({ buttonText: "Content is loading..." });
      this.setState({ selectedClass: "hide" });

      this.setState({ selectedCat: "" }, () => {
        this.setState({ categoryUrl: "" }, () => {
          this.setState({ postOffset: 0 }, () => {
            this.setState({ posts: [] }, () => {
              this.searchThenLoadBlogPosts(searchQuery);
            });
          });
        });
      });
    }
  }

  handlePageClick(pageNumber) {
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

  pagination() {}

  handleClassName(i) {
    let currentPage = this.state.postOffset / 9 + 1;
    console.log("currentPage", currentPage);
    if (i == currentPage) {
      return "active";
    } else if (i > 3 && this.state.showAllPages == false) {
      return "hidden";
    } else {
      return "";
    }
  }

  handleMorePag() {}

  render() {
    return (
      <section id="blogPage">
        <div className="">
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
              placeholder="Search Posts"
              default-value=""
            />
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
                  dangerouslySetInnerHTML={{
                    __html: "All Services",
                  }}
                />
              </li>
              {this.state.services.map((category, id) => {
                return (
                  <li className="cat-item" key={id}>
                    <a
                      onClick={() =>
                        this.handleServiceClick(category.id, category.name)
                      }
                      dangerouslySetInnerHTML={{
                        __html: category.name,
                      }}
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
                  dangerouslySetInnerHTML={{
                    __html: "All Sectors",
                  }}
                />
              </li>
              {this.state.industries.map((category, id) => {
                return (
                  <li className="cat-item" key={id}>
                    <a
                      onClick={() =>
                        this.handleIndustryClick(category.id, category.name)
                      }
                      dangerouslySetInnerHTML={{
                        __html: category.name,
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="blogs about-body">
          <section id="selectedCats" className={this.state.selectedClass}>
            <span onClick={this.handleCategoryRemoval}>
              {this.state.selectedCat}
            </span>
          </section>

          {this.state.posts.map((post, id) => {
            const image = () => {
              const hasMedia: boolean =
                post._embedded.hasOwnProperty("wp:featuredmedia");
              const hasImage: boolean = hasMedia
                ? post._embedded["wp:featuredmedia"][0].hasOwnProperty(
                    "source_url"
                  )
                : false;
              return hasMedia && hasImage ? (
                <img
                  src={post._embedded["wp:featuredmedia"][0].source_url}
                ></img>
              ) : (
                <div className="imageSpacer" />
              );
            };

            const date = new Date(post.date).toLocaleString("en-us", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            });
            //console.log(post);
            //console.log(id);
            return (
              <div className="col-md-4 post" key={id}>
                {image()}
                <div className="post-footer"></div>
                <div
                  className="excerpt"
                  dangerouslySetInnerHTML={{
                    __html: date,
                  }}
                />
                <a
                  href={post.link}
                  dangerouslySetInnerHTML={{
                    __html: post.title.rendered,
                  }}
                />
              </div>
            );
          })}

          <div className="btnWrapper hidden">
            <a onClick={this.handleButtonClick} className="button red no-arrow">
              {this.state.buttonText}
            </a>
          </div>

          <div className="pagination-custom">
            <p className="title">Posts Navigation</p>
            {this.state.pagesArr.map((i, index) => {
              if (index == this.state.pagesArr.length - 1) {
                return (
                  <span className="noSpacing">
                    <span
                      onClick={() => {
                        this.handlePageClick(index);
                      }}
                      className={this.handleClassName(i)}
                    >
                      {i}
                    </span>
                    <span
                      onClick={() => {
                        this.setState({
                          showAllPages: !this.state.showAllPages,
                        });
                      }}
                    >
                      ...
                    </span>
                  </span>
                );
              } else {
                return (
                  <span
                    onClick={() => {
                      this.handlePageClick(index);
                    }}
                    className={this.handleClassName(i)}
                  >
                    {i}
                  </span>
                );
              }
            })}
            <i className="far fa-chevron-double-right"></i>
          </div>
        </div>
      </section>
    );
  }
}
