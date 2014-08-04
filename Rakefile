require 'rubygems'
require 'rake'
require 'rdoc'
require 'date'
require 'yaml'
require 'tmpdir'
require 'jekyll'

desc "Generate blog files"
task :generate do
    Jekyll::Site.new(Jekyll.configuration({
        "source"      => ".",
        "destination" => "_site"
        })).process
end


desc "Generate and publish blog to gh-pages"
task :publish => [:generate] do
    tmp = "../tmp"
    system "mv _site/* #{tmp}"
    system "git checkout -B gh-pages"
    system "rm -rf *.* css _*"
    system "mv #{tmp}/* ."
    message = "Site updated at #{Time.now.utc}"
    system "git add -A"
    system "git commit -a -m #{message.shellescape}"
    system "git push origin gh-pages --force"
    system "git checkout master"
    system "git stash"
    system "echo yolo"
end

task :default => :publish